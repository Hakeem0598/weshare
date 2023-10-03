data "aws_acm_certificate" "eu_cert" {
  domain = var.domain_name
}

data "aws_acm_certificate" "us_cert" {
  provider = aws.us
  domain   = var.domain_name
}

module "api" {
  source                           = "../modules/api"
  create_share_route_path          = "/"
  create_share_integration_method  = "POST"
  create_share_lambda_arn          = module.backend.create_share_lambda_arn
  download_file_route_path         = "/{id}"
  download_file_integration_method = "GET"
  download_file_lambda_arn         = module.backend.download_file_lambda_arn
  api_gateway_stage_name           = var.api_gateway_stage_name
  environment                      = local.environment
  app_name                         = var.app_name
  domain_name                      = var.domain_name
  acm_certificate_arn              = data.aws_acm_certificate.eu_cert.arn
}

module "backend" {
  source                    = "../modules/backend"
  files_bucket_name         = local.files_bucket_name
  create_share_image_uri    = var.create_share_image_uri
  create_share_lambda_name  = var.create_share_lambda_name
  download_file_image_uri   = var.download_file_image_uri
  download_file_lambda_name = var.download_file_lambda_name
  execution_role_arn        = module.security.execution_role_arn
  api_gateway_execution_arn = module.api.api_gateway_execution_arn
  environment               = local.environment
  app_name                  = var.app_name
  domain_name               = var.domain_name
}

module "cdn" {
  source                          = "../modules/cdn"
  acm_certificate_arn             = data.aws_acm_certificate.us_cert.arn
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
  environment                            = local.environment
  app_name                               = var.app_name
  apigateway_domain_name                 = module.api.apigateway_domain_name
  apigateway_hosted_zone_id              = module.api.apigateway_hosted_zone_id
}

module "storage" {
  source                      = "../modules/storage"
  cloudfront_distribution_arn = module.cdn.cloudfront_distribution_arn
  web_bucket_name             = local.web_bucket_name
  logs_bucket_name            = local.logs_bucket_name
  files_bucket_name           = local.files_bucket_name
  environment                 = local.environment
  app_name                    = var.app_name
}

module "security" {
  source           = "../modules/security"
  lambda_role_name = "${var.app_name}-task-execution-role"
  environment      = local.environment
  app_name         = var.app_name
  files_bucket_arn = module.storage.files_bucket_arn
}
