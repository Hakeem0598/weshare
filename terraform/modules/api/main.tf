resource "aws_apigatewayv2_api" "agw" {
  name          = "${var.app_name}-agw-${var.environment}"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "POST", "OPTIONS"]
    allow_headers = ["context-type"]
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

resource "aws_apigatewayv2_api_mapping" "api_mapping" {
  api_id          = aws_apigatewayv2_api.agw.id
  domain_name     = aws_apigatewayv2_domain_name.api.id
  stage           = var.environment
  api_mapping_key = "share"
}
