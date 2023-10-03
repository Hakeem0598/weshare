resource "aws_lambda_function" "create_share" {
  function_name = "${var.app_name}-${var.lambda_name}-${var.environment}"
  role          = var.execution_role_arn
  image_uri     = var.image_uri
  package_type  = "Image"
  timeout       = 30

  environment {
    variables = {
      BUCKET_NAME = var.files_bucket_name
    }
  }

  tags = {
    Name = "${var.app_name}-${var.lambda_name}-${var.environment}"
  }
}

resource "aws_lambda_permission" "create_share_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.create_share.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_gateway_execution_arn}/*/*"
}
