locals {
  BASE_URL                             = var.environment == "production" ? "https://api.${var.domain_name}" : "https://api-${var.environment}.${var.domain_name}"
  POWERTOOLS_SERVICE_NAME_WESHARE      = "weshare"
  POWERTOOLS_METRICS_NAMESPACE_WESHARE = "weshare"
  POWERTOOLS_SERVICE_NAME_AUTH         = "auth"
  POWERTOOLS_METRICS_NAMESPACE_AUTH    = "auth"
  CLIENT_ID                            = var.client_id
  CLIENT_SECRET                        = var.client_secret
  AWS_REGION                           = var.aws_region
  USER_POOL_DOMAIN                     = var.user_pool_domain
}

resource "aws_lambda_function" "create_share" {
  function_name = "${var.app_name}-${var.create_share_lambda_name}-${var.environment}"
  role          = var.execution_role_arn
  image_uri     = var.create_share_image_uri
  package_type  = "Image"
  timeout       = 30

  environment {
    variables = {
      BUCKET_NAME                  = var.files_bucket_name
      BASE_URL                     = local.BASE_URL
      POWERTOOLS_SERVICE_NAME      = local.POWERTOOLS_SERVICE_NAME_WESHARE
      POWERTOOLS_METRICS_NAMESPACE = local.POWERTOOLS_METRICS_NAMESPACE_WESHARE
      AWS_REGION                   = var.aws_region
    }
  }

  tags = {
    Name = "${var.app_name}-${var.create_share_lambda_name}-${var.environment}"
  }
}

resource "aws_lambda_permission" "create_share_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.create_share.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_gateway_execution_arn}/*/*"
}

resource "aws_lambda_function" "download_file" {
  function_name = "${var.app_name}-${var.download_file_lambda_name}-${var.environment}"
  role          = var.execution_role_arn
  image_uri     = var.download_file_image_uri
  package_type  = "Image"
  timeout       = 30

  environment {
    variables = {
      BUCKET_NAME                  = var.files_bucket_name
      BASE_URL                     = local.BASE_URL
      POWERTOOLS_SERVICE_NAME      = local.POWERTOOLS_SERVICE_NAME_WESHARE
      POWERTOOLS_METRICS_NAMESPACE = local.POWERTOOLS_METRICS_NAMESPACE_WESHARE
      AWS_REGION                   = var.aws_region
    }
  }

  tags = {
    Name = "${var.app_name}-${var.download_file_lambda_name}-${var.environment}"
  }
}

resource "aws_lambda_permission" "download_file_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.download_file.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_gateway_execution_arn}/*/*"
}

resource "aws_lambda_function" "auth_code" {
  function_name = "${var.app_name}-${var.auth_code_lambda_name}-${var.environment}"
  role          = var.execution_role_arn
  image_uri     = var.auth_code_uri
  package_type  = "Image"
  timeout       = 30

  environment {
    variables = {
      BASE_URL                     = local.BASE_URL
      POWERTOOLS_SERVICE_NAME      = local.POWERTOOLS_SERVICE_NAME_AUTH
      POWERTOOLS_METRICS_NAMESPACE = local.POWERTOOLS_METRICS_NAMESPACE_AUTH
      AWS_REGION                   = var.aws_region
      CLIENT_ID                    = local.CLIENT_ID
      USER_POOL_DOMAIN             = local.USER_POOL_DOMAIN
    }
  }

  tags = {
    Name = "${var.app_name}-${var.auth_code_lambda_name}-${var.environment}"
  }
}

resource "aws_lambda_permission" "auth_code_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.auth_code.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_gateway_execution_arn}/*/*"
}
resource "aws_lambda_function" "oauth_callback" {
  function_name = "${var.app_name}-${var.oauth_callback_lambda_name}-${var.environment}"
  role          = var.execution_role_arn
  image_uri     = var.oauth_callback_uri
  package_type  = "Image"
  timeout       = 30

  environment {
    variables = {
      BASE_URL                     = local.BASE_URL
      POWERTOOLS_SERVICE_NAME      = local.POWERTOOLS_SERVICE_NAME_AUTH
      POWERTOOLS_METRICS_NAMESPACE = local.POWERTOOLS_METRICS_NAMESPACE_AUTH
      AWS_REGION                   = var.aws_region
      CLIENT_ID                    = local.CLIENT_ID
      USER_POOL_DOMAIN             = local.USER_POOL_DOMAIN
    }
  }

  tags = {
    Name = "${var.app_name}-${var.oauth_callback_lambda_name}-${var.environment}"
  }
}

resource "aws_lambda_permission" "oauth_callback_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.oauth_callback.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_gateway_execution_arn}/*/*"
}
