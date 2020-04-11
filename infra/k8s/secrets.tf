resource "kubernetes_secret" "public_api_service_secrets" {
  metadata {
    name              = "public-api-service-secrets"
  }

  data = {
    DATABASE_USER       = var.database_user
    DATABASE_PASSWORD   = var.database_password

    AUTH0_CLIENT_SECRET = var.auth0_client_secret
  }
}