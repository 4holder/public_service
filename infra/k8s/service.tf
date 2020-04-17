resource "kubernetes_service" "public_service_service" {
  metadata {
    name = "public-service-service-${var.environment}"
    labels = {
      service = "public-service"
    }
  }

  spec {
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

    type = "NodePort"
  }
}