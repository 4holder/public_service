output "service_address" {
  value = kubernetes_service.public_service_service.spec[0].cluster_ip
}

output "load_balancer_ip" {
  value = kubernetes_service.public_service_service.load_balancer_ingress.0.ip
}