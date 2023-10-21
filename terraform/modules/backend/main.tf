locals {
  BASE_URL                             = var.environment == "production" ? "https://api.${var.domain_name}" : "https://api-${var.environment}.${var.domain_name}"
  CLIENT_URL                           = var.environment == "production" ? "https://${var.domain_name}" : "https://${var.environment}.${var.domain_name}"
  CLIENT_ID                            = var.client_id
  CLIENT_SECRET                        = var.client_secret
  USER_POOL_DOMAIN                     = var.user_pool_domain
  POWERTOOLS_SERVICE_NAME_WESHARE      = "weshare"
  POWERTOOLS_METRICS_NAMESPACE_WESHARE = "weshare"
  POWERTOOLS_SERVICE_NAME_AUTH         = "auth"
  POWERTOOLS_METRICS_NAMESPACE_AUTH    = "auth"
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
  image_uri     = var.auth_code_image_uri
  package_type  = "Image"
  timeout       = 30

  environment {
    variables = {
      BASE_URL                     = local.BASE_URL
      POWERTOOLS_SERVICE_NAME      = local.POWERTOOLS_SERVICE_NAME_AUTH
      POWERTOOLS_METRICS_NAMESPACE = local.POWERTOOLS_METRICS_NAMESPACE_AUTH
      CLIENT_ID                    = local.CLIENT_ID
      CLIENT_URL                   = local.CLIENT_URL
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
  image_uri     = var.oauth_callback_image_uri
  package_type  = "Image"
  timeout       = 30

  environment {
    variables = {
      BASE_URL                     = local.BASE_URL
      POWERTOOLS_SERVICE_NAME      = local.POWERTOOLS_SERVICE_NAME_AUTH
      POWERTOOLS_METRICS_NAMESPACE = local.POWERTOOLS_METRICS_NAMESPACE_AUTH
      CLIENT_ID                    = local.CLIENT_ID
      CLIENT_SECRET                = local.CLIENT_SECRET
      CLIENT_URL                   = local.CLIENT_URL
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

resource "aws_lambda_function" "user_info" {
  function_name = "${var.app_name}-${var.user_info_lambda_name}-${var.environment}"
  role          = var.execution_role_arn
  image_uri     = var.user_info_image_uri
  package_type  = "Image"
  timeout       = 30

  environment {
    variables = {
      BASE_URL                     = local.BASE_URL
      POWERTOOLS_SERVICE_NAME      = local.POWERTOOLS_SERVICE_NAME_AUTH
      POWERTOOLS_METRICS_NAMESPACE = local.POWERTOOLS_METRICS_NAMESPACE_AUTH
      CLIENT_ID                    = local.CLIENT_ID
      CLIENT_SECRET                = local.CLIENT_SECRET
      CLIENT_URL                   = local.CLIENT_URL
      USER_POOL_DOMAIN             = local.USER_POOL_DOMAIN
    }
  }

  tags = {
    Name = "${var.app_name}-${var.user_info_lambda_name}-${var.environment}"
  }
}

resource "aws_lambda_permission" "user_info_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.user_info.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_gateway_execution_arn}/*/*"
}


resource "aws_lambda_function" "sign_out" {
  function_name = "${var.app_name}-${var.sign_out_lambda_name}-${var.environment}"
  role          = var.execution_role_arn
  image_uri     = var.sign_out_image_uri
  package_type  = "Image"
  timeout       = 30

  environment {
    variables = {
      BASE_URL                     = local.BASE_URL
      POWERTOOLS_SERVICE_NAME      = local.POWERTOOLS_SERVICE_NAME_AUTH
      POWERTOOLS_METRICS_NAMESPACE = local.POWERTOOLS_METRICS_NAMESPACE_AUTH
      CLIENT_ID                    = local.CLIENT_ID
      CLIENT_SECRET                = local.CLIENT_SECRET
      CLIENT_URL                   = local.CLIENT_URL
      USER_POOL_DOMAIN             = local.USER_POOL_DOMAIN
    }
  }

  tags = {
    Name = "${var.app_name}-${var.sign_out_lambda_name}-${var.environment}"
  }
}

resource "aws_lambda_permission" "sign_out_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.sign_out.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_gateway_execution_arn}/*/*"
}
