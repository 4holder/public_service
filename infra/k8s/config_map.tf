resource "kubernetes_config_map" "public_api_service_config" {
  metadata {
    name            = "public-api-service-config"
  }

  data = {
    DATABASE_NAME   = var.database_name
    DATABASE_HOST   = var.database_host
    DATABASE_PORT   = var.database_port
  }
}