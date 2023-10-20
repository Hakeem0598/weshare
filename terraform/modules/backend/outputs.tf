output "create_share_lambda_arn" {
  value = aws_lambda_function.create_share.arn
}

output "download_file_lambda_arn" {
  value = aws_lambda_function.download_file.arn
}

output "auth_code_lambda_arn" {
  value = aws_lambda_function.auth_code.arn
}

output "oauth_callback_lambda_arn" {
  value = aws_lambda_function.oauth_callback.arn
}

output "user_info_lambda_arn" {
  value = aws_lambda_function.user_info.arn
}
