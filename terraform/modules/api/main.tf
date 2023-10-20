locals {
  origin = var.environment == "production" ? "https://${var.domain_name}" : "https://${var.environment}.${var.domain_name}"
}

resource "aws_apigatewayv2_api" "agw" {
  name          = "${var.app_name}-agw-${var.environment}"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = [local.origin]
    allow_methods = ["GET", "POST", "OPTIONS"]
    allow_headers = ["context-type", "authorization"]
    allow_credentials = true
  }

  tags = {
    "Name" = "${var.app_name}-${var.api_gateway_stage_name}-agw-${var.environment}"
  }
}

resource "aws_apigatewayv2_integration" "create_share_lambda_integration" {
  api_id             = aws_apigatewayv2_api.agw.id
  integration_type   = "AWS_PROXY"
  integration_method = var.create_share_integration_method
  integration_uri    = var.create_share_lambda_arn
}

resource "aws_apigatewayv2_route" "create_share_route" {
  api_id    = aws_apigatewayv2_api.agw.id
  route_key = "${var.create_share_integration_method} ${var.create_share_route_path}"
  target    = "integrations/${aws_apigatewayv2_integration.create_share_lambda_integration.id}"
}

resource "aws_apigatewayv2_integration" "download_file_lambda_integration" {
  api_id             = aws_apigatewayv2_api.agw.id
  integration_type   = "AWS_PROXY"
  integration_method = var.download_file_integration_method
  integration_uri    = var.download_file_lambda_arn
}

resource "aws_apigatewayv2_route" "download_file_route" {
  api_id    = aws_apigatewayv2_api.agw.id
  route_key = "${var.download_file_integration_method} ${var.download_file_route_path}"
  target    = "integrations/${aws_apigatewayv2_integration.download_file_lambda_integration.id}"
}

resource "aws_apigatewayv2_integration" "auth_code_lambda_integration" {
  api_id             = aws_apigatewayv2_api.agw.id
  integration_type   = "AWS_PROXY"
  integration_method = var.auth_code_integration_method
  integration_uri    = var.auth_code_lambda_arn
}

resource "aws_apigatewayv2_route" "auth_code_route" {
  api_id    = aws_apigatewayv2_api.agw.id
  route_key = "${var.auth_code_integration_method} ${var.auth_code_route_path}"
  target    = "integrations/${aws_apigatewayv2_integration.auth_code_lambda_integration.id}"
}

resource "aws_apigatewayv2_integration" "oauth_callback_lambda_integration" {
  api_id             = aws_apigatewayv2_api.agw.id
  integration_type   = "AWS_PROXY"
  integration_method = var.oauth_callback_integration_method
  integration_uri    = var.oauth_callback_lambda_arn
}

resource "aws_apigatewayv2_route" "oauth_callback_route" {
  api_id    = aws_apigatewayv2_api.agw.id
  route_key = "${var.oauth_callback_integration_method} ${var.oauth_callback_route_path}"
  target    = "integrations/${aws_apigatewayv2_integration.oauth_callback_lambda_integration.id}"
}

resource "aws_apigatewayv2_integration" "user_info_lambda_integration" {
  api_id             = aws_apigatewayv2_api.agw.id
  integration_type   = "AWS_PROXY"
  integration_method = var.user_info_integration_method
  integration_uri    = var.user_info_lambda_arn
}

resource "aws_apigatewayv2_route" "user_info_route" {
  api_id    = aws_apigatewayv2_api.agw.id
  route_key = "${var.user_info_integration_method} ${var.user_info_route_path}"
  target    = "integrations/${aws_apigatewayv2_integration.user_info_lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "stage" {
  api_id      = aws_apigatewayv2_api.agw.id
  name        = var.environment
  auto_deploy = true

  tags = {
    Name = "${var.app_name}-${var.api_gateway_stage_name}-stage-${var.environment}"
  }
}

locals {
  domain_name = var.environment == "production" ? "api.${var.domain_name}" : "api-${var.environment}.${var.domain_name}"
}

resource "aws_apigatewayv2_domain_name" "api" {
  domain_name = local.domain_name
  domain_name_configuration {
    certificate_arn = var.acm_certificate_arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_apigatewayv2_api_mapping" "share_api_mapping" {
  api_id          = aws_apigatewayv2_api.agw.id
  domain_name     = aws_apigatewayv2_domain_name.api.id
  stage           = var.environment
}
