data "aws_route53_zone" "primary" {
  name         = var.domain_name
  private_zone = false
}

locals {
  web_subdomain = var.environment == "production" ? var.domain_name : "${var.environment}.${var.domain_name}"
  api_subdomain = var.environment == "production" ? "api.${var.domain_name}" : "api-${var.environment}.${var.domain_name}"
}

resource "aws_route53_record" "web_subdomain" {
  name    = local.web_subdomain
  type    = "A"
  zone_id = data.aws_route53_zone.primary.zone_id

  alias {
    name                   = var.cloudfront_distribution_domain_name
    zone_id                = var.cloudfront_distribution_hosted_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "api_subdomain" {
  name = local.api_subdomain
  type = "A"
  zone_id = data.aws_route53_zone.primary.zone_id

  alias {
    name = var.apigateway_domain_name
    zone_id = var.apigateway_hosted_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "a_name_record" {
  count = var.environment == "production" ? 1 : 0

  name = "www"
  type = "CNAME"
  zone_id = data.aws_route53_zone.primary.zone_id
  ttl     = 5
  records = [ var.domain_name ]
}