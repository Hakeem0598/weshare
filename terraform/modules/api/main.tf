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

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id             = aws_apigatewayv2_api.agw.id
  integration_type   = "AWS_PROXY"
  integration_method = var.integration_method
  integration_uri    = var.lambda_arn
}

resource "aws_apigatewayv2_route" "agw_route" {
  api_id    = aws_apigatewayv2_api.agw.id
  route_key = "${var.integration_method} ${var.route_path}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "primary_stage" {
  api_id          = aws_apigatewayv2_api.agw.id
  name            = var.environment
  auto_deploy = true

  tags = {
    Name = "${var.app_name}-${var.api_gateway_stage_name}-stage-${var.environment}"
  }
}

locals {
  domain_name = var.environment == "production" ? "api.${var.domain_name}" : "api.${var.environment}.${var.domain_name}"
}

resource "aws_apigatewayv2_domain_name" "api" {
  domain_name = local.domain_name

  domain_name_configuration {
    certificate_arn = var.acm_certificate_arn
    endpoint_type = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}