locals {
  subdomain = var.environment == "production" ? "www.${var.domain_name}" : "${var.environment}.${var.domain_name}"
}

resource "aws_acm_certificate" "cert" {
  provider = aws.us

  domain_name       = var.domain_name
  validation_method = "DNS"
  subject_alternative_names = [ local.subdomain ]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "validation" {
  provider = aws.us

  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in var.route53_cname_records : record.fqdn]
}

/*

hakeem.bio
www.hakeem.bio
staging.hakeem.bio

api.hakeem.bio
api.staging.hakeem.bio

*/