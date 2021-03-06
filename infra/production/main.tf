variable "gcloud_project_id" { default = "fin2you" }
variable "credentials_file" { default = "../credentials/account.json" }

variable "region" {}
variable "environment" {}
variable "k8s_username" {}
variable "k8s_password" {}
variable "k8s_namespace" {}
variable "cluster_name" {}
variable "gcloud_sql_instance" {}
variable "db_machine_type" {}

variable "replicas" { default = 1 }
variable "min_replicas" { default = 1 }
variable "max_replicas" { default = 5 }

variable "default_public_service_container" { default = "gcr.io/fin2you/public-service:a47198a598446b7d4bd4b32d1ed1fa554933eee0" }

variable "database_name" {}
variable "database_host" {}
variable "database_port" {}
variable "database_password" {}
variable "database_user" {}

variable "auth0_client_id" {}
variable "auth0_client_secret" {}
variable "auth0_domain" {}
variable "token_algorithm" {}
variable "token_audience" {}
variable "token_issuer" {}
variable "token_jwksuri" {}

variable "subdomain" {}
variable certificate_name {}

variable "global_static_ip_name" {}
variable "load_balancer_ip" {}

variable "cash_flow_service_url" {}

provider "google" {
  credentials = file("../credentials/account.json")
  project     = var.gcloud_project_id
  region      = var.region
}

locals {
  gke_cluster_zone = "${var.region}-a"
}

terraform {
  backend "gcs" {
    bucket      = "public_service_production_terraform"
    prefix      = "public_service_production.tfstate"
    credentials = "../credentials/account.json"
  }
}

module "public_service_db" {
  source                    = "../modules/db"
  credentials_file          = var.credentials_file
  gcloud_project_id         = var.gcloud_project_id
  gcloud_region             = var.region
  machine_type              = var.db_machine_type
}

module "public_service_certificate" {
  source                    = "../modules/managed_certificate"
  credentials_file          = var.credentials_file
  gcloud_project_id         = var.gcloud_project_id
  gcloud_region             = var.region

  certificate_name          = var.certificate_name
  dns_name                  = "${var.subdomain}.${data.terraform_remote_state.infra_production_state.outputs.dns_zone}"
}

module "public_service" {
  source                    = "../modules/k8s"
  credentials_file          = var.credentials_file
  gcloud_project_id         = var.gcloud_project_id
  gcloud_region             = local.gke_cluster_zone

  default_container         = var.default_public_service_container
  environment               = var.environment

  k8s_master_host           = data.terraform_remote_state.infra_production_state.outputs.endpoint
  k8s_ca_certificate        = data.terraform_remote_state.infra_production_state.outputs.cluster_ca_certificate
  k8s_client_certificate    = data.terraform_remote_state.infra_production_state.outputs.client_certificate
  k8s_client_key            = data.terraform_remote_state.infra_production_state.outputs.client_key
  k8s_username              = var.k8s_username
  k8s_password              = var.k8s_password
  k8s_namespace             = var.k8s_namespace
  cluster_name              = var.cluster_name
  replicas                  = var.replicas
  min_replicas              = var.min_replicas
  max_replicas              = var.max_replicas

  gcloud_sql_instance       = var.gcloud_sql_instance
  public_service_db         = module.public_service_db

  database_name             = var.database_name
  database_host             = var.database_host
  database_port             = var.database_port
  database_password         = var.database_password
  database_user             = var.database_user

  auth0_client_id           = var.auth0_client_id
  auth0_client_secret       = var.auth0_client_secret
  auth0_domain              = var.auth0_domain
  token_algorithm           = var.token_algorithm
  token_audience            = var.token_audience
  token_issuer              = var.token_issuer
  token_jwksuri             = var.token_jwksuri


  ingress_ip_name          = var.global_static_ip_name
  managed_certificate_name = var.certificate_name

  cash_flow_service_url    = var.cash_flow_service_url
}

module "public_service_dns" {
  source                    = "../modules/dns"
  credentials_file          = var.credentials_file
  gcloud_project_id         = var.gcloud_project_id
  gcloud_region             = var.region

  dns_name                  = data.terraform_remote_state.infra_production_state.outputs.dns_zone
  load_balancer_ip          = var.load_balancer_ip
  subdomain                 = var.subdomain
  zone_name                 = data.terraform_remote_state.infra_production_state.outputs.zone_name
}
