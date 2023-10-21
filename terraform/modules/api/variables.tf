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

variable "auth_code_integration_method" {
  type = string
}

variable "auth_code_route_path" {
  type = string
}
variable "auth_code_lambda_arn" {
  type = string
}

variable "oauth_callback_integration_method" {
  type = string
}

variable "oauth_callback_route_path" {
  type = string
}
variable "oauth_callback_lambda_arn" {
  type = string
}

variable "user_info_integration_method" {
  type = string
}

variable "user_info_route_path" {
  type = string
}
variable "user_info_lambda_arn" {
  type = string
}

variable "sign_out_integration_method" {
  type = string
}

variable "sign_out_route_path" {
  type = string
}
variable "sign_out_lambda_arn" {
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