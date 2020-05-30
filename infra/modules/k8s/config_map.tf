resource "kubernetes_config_map" "public_api_service_config" {
  metadata {
    name                    = "public-api-service-config"
  }

  data = {
    DATABASE_NAME           = var.database_name
    DATABASE_HOST           = var.database_host
    DATABASE_PORT           = var.database_port

    AUTH0_DOMAIN            = var.auth0_domain
    AUTH0_CLIENT_ID         = var.auth0_client_id

    TOKEN_AUDIENCE          = var.token_audience
    TOKEN_ISSUER            = var.token_issuer
    TOKEN_ALGORITHM         = var.token_algorithm
    TOKEN_JWKSURI           = var.token_jwksuri

    CASH_FLOW_SERVICE_URL   = var.cash_flow_service_url
  }
}