variable "credentials_file" {}
variable "gcloud_project_id" {}
variable "gcloud_region" {}

variable "default_container" { }

variable "environment" {}
variable "cluster_name" {}
variable "k8s_master_host" {}
variable "k8s_ca_certificate" {}
variable "k8s_client_certificate" {}
variable "k8s_client_key" {}
variable "k8s_username" {}
variable "k8s_password" {}
variable "k8s_namespace" { default = "default" }

variable "gcloud_sql_instance" {}

variable "replicas" {}
variable "min_replicas" {}
variable "max_replicas" {}
variable "public_service_db" {}

variable "database_name" {}
variable "database_host" {}
variable "database_port" {}
variable "database_password" {}
variable "database_user" {}

variable "auth0_domain" {}
variable "auth0_client_id" {}
variable "auth0_client_secret" {}
variable "token_audience" {}
variable "token_issuer" {}
variable "token_algorithm" {}
variable "token_jwksuri" {}

variable "ingress_ip_name" {}
variable "managed_certificate_name" {}
