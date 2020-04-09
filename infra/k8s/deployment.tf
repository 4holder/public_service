resource "kubernetes_service" "public_service_service" {
  metadata {
    name = "public-service-service-${var.environment}"
    labels = {
      service = "public-service"
    }
  }

  spec {
    port {
      name = "api-https"
      protocol    = "TCP"
      port        = 443
      target_port = 3000
    }

    port {
      name = "api-http"
      protocol    = "TCP"
      port        = 80
      target_port = 3000
    }

    selector = {
      environment = var.environment
      service = "public-service"
    }

    type = "LoadBalancer"
  }
}

resource "kubernetes_deployment" "public_service" {
  depends_on = [var.public_service_db]

  metadata {
    name = "public-service-${var.environment}"
    labels = {
      service = "public-service"
      environment = var.environment
    }
  }

  spec {
    replicas = var.replicas

    selector {
      match_labels = {
        service = "public-service"
        environment = var.environment
      }
    }

    template {
      metadata {
        labels = {
          service = "public-service"
          environment = var.environment
        }
      }

      spec {
        container {
          image = var.default_container
          name = "public-service"

          port {
            name = "api-http"
            container_port = 3000
          }

          env_from {
            config_map_ref {
              name = "public-api-service-config"
            }
          }

          env_from {
            secret_ref {
              name = "public-api-service-secrets"
            }
          }

          liveness_probe {
            http_get {
              scheme = "HTTP"
              path = "/.well-known/apollo/server-health"
              port = 3000
            }
            timeout_seconds = 5
            success_threshold = 1
            failure_threshold = 5
            period_seconds = 30
            initial_delay_seconds = 45
          }

          readiness_probe {
            http_get {
              scheme = "HTTP"
              path = "/.well-known/apollo/server-health"
              port = 3000
            }
            timeout_seconds = 5
            success_threshold = 1
            failure_threshold = 5
            period_seconds = 30
            initial_delay_seconds = 30
          }
        }
        container {
          name = "cloudsql-proxy"
          image = "gcr.io/cloudsql-docker/gce-proxy:1.16"
          command = [
            "/cloud_sql_proxy",
            "-instances=${var.gcloud_sql_instance}",
            "-credential_file=/secrets/cloudsql/account.json"
          ]

          security_context {
            run_as_user = 2
            allow_privilege_escalation = false
          }

          volume_mount {
            name = "cloudsql-instance-credentials"
            mount_path = "/secrets/cloudsql"
            read_only = true
          }
        }
        volume {
          name = "cloudsql-instance-credentials"
          secret {
            secret_name = "cloudsql-instance-credentials"
          }
        }
      }
    }
  }


  lifecycle {
    ignore_changes = [
      "spec[0].template[0].spec[0].container[0].image"
    ]
  }
}