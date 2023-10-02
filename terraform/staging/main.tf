data "aws_acm_certificate" "cert" {
  domain = var.domain_name
}

module "api" {
  source                 = "../modules/api"
  route_path             = "/"
  integration_method     = "POST"
  lambda_arn             = module.backend.lambda_arn
  api_gateway_stage_name = var.api_gateway_stage_name
  environment            = local.environment
  app_name               = var.app_name
  domain_name            = var.domain_name
  acm_certificate_arn    = data.aws_acm_certificate.cert.arn
}

module "backend" {
  source                    = "../modules/backend"
  files_bucket_name         = local.files_bucket_name
  image_uri                 = var.image_uri
  lambda_name               = var.lambda_name
  execution_role_arn        = module.security.execution_role_arn
  api_gateway_execution_arn = module.api.api_gateway_execution_arn
  environment               = local.environment
  app_name                  = var.app_name
}

module "cdn" {
  source = "../modules/cdn"
  acm_certificate_arn    = data.aws_acm_certificate.cert.arn
  domain_name                     = var.domain_name
  logs_bucket_domain_name         = module.storage.logs_bucket_domain_name
  web_bucket_regional_domain_name = module.storage.web_bucket_regional_domain_name
  environment                     = local.environment
  app_name                        = var.app_name
}

module "dns" {
  source                                 = "../modules/dns"
  cloudfront_distribution_domain_name    = module.cdn.cloudfront_distribution_domain_name
  cloudfront_distribution_hosted_zone_id = module.cdn.cloudfront_distribution_hosted_zone_id
  domain_name                            = var.domain_name
  environment = local.environment
  app_name    = var.app_name
  apigateway_domain_name = module.api.apigateway_domain_name
  apigateway_hosted_zone_id = module.api.apigateway_hosted_zone_id
}

# module "ssl_certificate" {
#   source                = "../modules/ssl_certificate"
#   domain_name           = var.domain_name
#   route53_cname_records = module.dns.route53_cname_records
#   environment           = local.environment
#   app_name              = var.app_name

#   providers = {
#     aws.us = aws.us
#   }
# }

module "security" {
  source           = "../modules/security"
  lambda_role_name = "${var.app_name}-task-execution-role"
  environment      = local.environment
  app_name         = var.app_name
}

module "storage" {
  source                      = "../modules/storage"
  cloudfront_distribution_arn = module.cdn.cloudfront_distribution_arn
  lambda_arn                  = module.backend.lambda_arn
  web_bucket_name             = local.web_bucket_name
  logs_bucket_name            = local.logs_bucket_name
  files_bucket_name           = local.files_bucket_name
  environment                 = local.environment
  app_name                    = var.app_name
}
