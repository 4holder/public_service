output "service_address" {
  value = kubernetes_service.public_service_service.spec[0].cluster_ip
}
