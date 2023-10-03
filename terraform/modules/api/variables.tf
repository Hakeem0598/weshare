variable "create_share_integration_method" {
  type = string
}

variable "create_share_route_path" {
  type = string
}
variable "create_share_lambda_arn" {
  type = string
}

variable "download_file_integration_method" {
  type = string
}

variable "download_file_route_path" {
  type = string
}
variable "download_file_lambda_arn" {
  type = string
}

variable "api_gateway_stage_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "app_name" {
  type = string
}

variable "domain_name" {
  type = string
}

variable "acm_certificate_arn" {
  type = string
}