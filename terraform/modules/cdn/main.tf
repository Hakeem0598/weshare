locals {
  s3_origin_id = "myS3Origin-${var.environment}"
}

resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "oac-${var.environment}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

data "aws_cloudfront_cache_policy" "optimised" {
  name = "Managed-CachingOptimized"
}

locals {
  aliases = var.environment == "production" ? [var.domain_name, "www.${var.domain_name}"] : ["${var.environment}.${var.domain_name}"]
}

resource "aws_cloudfront_distribution" "dist" {
  enabled             = false
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases             = local.aliases
  price_class         = "PriceClass_100"

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.s3_origin_id
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    cache_policy_id        = data.aws_cloudfront_cache_policy.optimised.id
  }

  origin {
    domain_name              = var.web_bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
    origin_id                = local.s3_origin_id
  }

  logging_config {
    include_cookies = false
    bucket          = var.logs_bucket_domain_name
  }

  restrictions {
    geo_restriction {
      locations        = []
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = var.acm_certificate_arn
    ssl_support_method = "sni-only"
  }
  
  tags = {
    Name = "${var.app_name}-cloudfront-distribution-${var.environment}"
  }
}
