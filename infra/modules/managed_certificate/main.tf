variable "credentials_file" {}
variable "gcloud_project_id" {}
variable "gcloud_region" {}

variable "dns_name" {}
variable certificate_name {}

provider "google-beta" {
  credentials = file(var.credentials_file)
  project     = var.gcloud_project_id
  region      = var.gcloud_region
}

resource "google_compute_managed_ssl_certificate" "public_api_certificate" {
  provider = "google-beta"

  name = var.certificate_name

  managed {
    domains = [var.dns_name]
  }
}