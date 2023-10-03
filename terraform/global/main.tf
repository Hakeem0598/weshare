data "aws_route53_zone" "primary" {
  name         = var.domain_name
  private_zone = false
}

# FRONTEND
resource "aws_acm_certificate" "us_cert" {
  provider = aws.us

  domain_name               = var.domain_name
  validation_method         = "DNS"
  subject_alternative_names = ["*.${var.domain_name}"]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "us_cname_records" {
  for_each = {
    for dvo in aws_acm_certificate.us_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.primary.zone_id
}

resource "aws_acm_certificate_validation" "us_cert_validation" {
  provider = aws.us

  certificate_arn         = aws_acm_certificate.us_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.us_cname_records : record.fqdn]
}

# BACKEND
resource "aws_acm_certificate" "eu_cert" {
  domain_name               = var.domain_name
  validation_method         = "DNS"
  subject_alternative_names = ["*.${var.domain_name}"]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "eu_cname_records" {
  for_each = {
    for dvo in aws_acm_certificate.eu_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.primary.zone_id
}

resource "aws_acm_certificate_validation" "validation" {
  certificate_arn         = aws_acm_certificate.eu_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.eu_cname_records : record.fqdn]
}
