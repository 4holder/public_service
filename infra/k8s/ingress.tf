resource "kubernetes_ingress" "public_service_ingress" {
  metadata {
    name = "public-service-ingress"
    annotations = {
      "kubernetes.io/ingress.global-static-ip-name" = var.ingress_ip_name
      "networking.gke.io/managed-certificates" = var.managed_certificate_name
    }
  }

  spec {

    backend {
      service_name = kubernetes_service.public_service_service.metadata[0].name
      service_port = 80
    }
  }
}