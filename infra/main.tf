variable "gcloud_project_id" { default = "fin2you" }
variable "credentials_file" { default = "./credentials/account.json" }

variable "region" {}
variable "environment" {}
variable "k8s_username" {}
variable "k8s_password" {}
variable "k8s_namespace" {}
variable "cluster_name" {}

variable "replicas" { default = 1 }
variable "min_replicas" { default = 1 }
variable "max_replicas" { default = 2 }

variable "default_public_service_container" { default = "gcr.io/fin2you/public-service:6153e7b54a69e71e74f6480c4b6bda0bd81f46f5" }

provider "google" {
  credentials = file("./credentials/account.json")
  project     = var.gcloud_project_id
  region      = var.region
}

terraform {
  backend "gcs" {
    bucket      = "public_service_production_terraform"
    prefix      = "public_service_production.tfstate"
    credentials = "./credentials/account.json"
  }
}

module "public_service" {
  source                    = "./k8s"
  credentials_file          = var.credentials_file
  gcloud_project_id         = var.gcloud_project_id
  gcloud_region             = var.region

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
}