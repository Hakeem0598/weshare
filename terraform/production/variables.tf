variable "app_name" {
  default = "weshare"
}

variable "aws_region" {
  default = "eu-west-2"
}

variable "api_gateway_stage_name" {
  type = string
}

variable "create_share_lambda_name" {
  type = string
}

variable "create_share_image_uri" {
  type = string
}

variable "download_file_lambda_name" {
  type = string
}

variable "download_file_image_uri" {
  type = string
}

variable "auth_code_lambda_name" {
  type = string
}

variable "auth_code_image_uri" {
  type = string
}

variable "oauth_callback_lambda_name" {
  type = string
}

variable "oauth_callback_image_uri" {
  type = string
}

variable "user_info_lambda_name" {
  type = string
}

variable "user_info_image_uri" {
  type = string
}

variable "sign_out_lambda_name" {
  type = string
}

variable "sign_out_image_uri" {
  type = string
}

variable "domain_name" {
  type = string
}