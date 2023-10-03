terraform {
  required_providers {
    aws = {
      source                = "hashicorp/aws"
      version               = "5.16.1"
      configuration_aliases = [aws.us]
    }
  }
}
