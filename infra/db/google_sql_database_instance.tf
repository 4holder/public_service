resource "random_id" "db_name_suffix" {
  byte_length = 4
}

resource "google_sql_database_instance" "user_portfolio_db" {
  name                = "user-portfolio-db-${random_id.db_name_suffix.hex}"
  region              = var.gcloud_region
  database_version    = "POSTGRES_12"

  depends_on = [google_compute_global_address.public_service_private_ip_address]

  settings {
    tier              = var.machine_type
    ip_configuration {
      ipv4_enabled    = false
      private_network = data.google_compute_network.default.self_link
    }
  }
}
