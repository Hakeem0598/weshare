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

variable "files_bucket_name" {
  type = string
}

variable "execution_role_arn" {
  type = string
}

variable "api_gateway_execution_arn" {
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

variable "aws_region" {
  type = string
}

variable "client_id" {
  type = string
} 

variable "client_secret" {
  type = string
} 

variable "user_pool_domain" {
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