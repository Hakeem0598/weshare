variable "app_name" {
  default = "weshare"
}

variable "aws_region" {
  default = "eu-west-2"
}

variable "api_gateway_stage_name" {
  default = "primary"
}

variable "lambda_name" {
  type = string
}

variable "image_uri" {
  type = string
}

variable "domain_name" {
  type = string
}