terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.16.1"
    }
  }

  backend "s3" {}
}

provider "aws" {
  region = var.aws_region
}

provider "aws" {
  alias  = "us"
  region = "us-east-1"
}