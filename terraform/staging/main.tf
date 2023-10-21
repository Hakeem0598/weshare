data "aws_acm_certificate" "eu_cert" {
  domain = var.domain_name
}

data "aws_acm_certificate" "us_cert" {
  provider = aws.us
  domain   = var.domain_name
}

module "api" {
  source                            = "../modules/api"
  create_share_route_path           = "/share"
  create_share_integration_method   = "POST"
  create_share_lambda_arn           = module.backend.create_share_lambda_arn
  download_file_route_path          = "/share/{id}"
  download_file_integration_method  = "GET"
  download_file_lambda_arn          = module.backend.download_file_lambda_arn
  auth_code_route_path              = "/auth/verify"
  auth_code_integration_method      = "GET"
  auth_code_lambda_arn              = module.backend.auth_code_lambda_arn
  oauth_callback_route_path         = "/auth/callback"
  oauth_callback_integration_method = "GET"
  oauth_callback_lambda_arn         = module.backend.oauth_callback_lambda_arn
  user_info_route_path              = "/auth/userInfo"
  user_info_integration_method      = "GET"
  user_info_lambda_arn              = module.backend.user_info_lambda_arn
  sign_out_route_path               = "/auth/signOut"
  sign_out_integration_method       = "POST"
  sign_out_lambda_arn               = module.backend.sign_out_lambda_arn
  api_gateway_stage_name            = var.api_gateway_stage_name
  environment                       = local.environment
  app_name                          = var.app_name
  domain_name                       = var.domain_name
  acm_certificate_arn               = data.aws_acm_certificate.eu_cert.arn
}

module "auth" {
  source      = "../modules/auth"
  app_name    = var.app_name
  environment = local.environment
  domain_name = var.domain_name
}

module "backend" {
  source                     = "../modules/backend"
  files_bucket_name          = local.files_bucket_name
  create_share_image_uri     = var.create_share_image_uri
  create_share_lambda_name   = var.create_share_lambda_name
  download_file_image_uri    = var.download_file_image_uri
  download_file_lambda_name  = var.download_file_lambda_name
  auth_code_lambda_name      = var.auth_code_lambda_name
  auth_code_image_uri        = var.auth_code_image_uri
  oauth_callback_lambda_name = var.oauth_callback_lambda_name
  oauth_callback_image_uri   = var.oauth_callback_image_uri
  user_info_lambda_name      = var.user_info_lambda_name
  user_info_image_uri        = var.user_info_image_uri
  sign_out_lambda_name       = var.sign_out_lambda_name
  sign_out_image_uri         = var.sign_out_image_uri
  execution_role_arn         = module.security.execution_role_arn
  api_gateway_execution_arn  = module.api.api_gateway_execution_arn
  environment                = local.environment
  app_name                   = var.app_name
  domain_name                = var.domain_name
  aws_region                 = var.aws_region
  client_id                  = module.auth.client_id
  client_secret              = module.auth.client_secret
  user_pool_domain           = module.auth.user_pool_domain
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
