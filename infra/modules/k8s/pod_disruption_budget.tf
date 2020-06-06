resource "kubernetes_pod_disruption_budget" "public_service_pdb" {
  metadata {
    name            = "public-service-pdb"
  }
  spec {
    min_available   = 1
    selector {
      match_labels  = {
        service     = "public-service"
      }
    }
  }
}