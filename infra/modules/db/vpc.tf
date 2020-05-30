data "google_compute_network" "default" {
  name          = "default"
}

resource "google_compute_global_address" "public_service_private_ip_address" {
  name          = "public-service-db-private-ip-address"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = data.google_compute_network.default.self_link
}

resource "google_service_networking_connection" "private_vpc_connection" {
  network                 = data.google_compute_network.default.self_link
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.public_service_private_ip_address.name]
}