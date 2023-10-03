output "create_share_lambda_arn" {
  value = aws_lambda_function.create_share.arn
}

output "download_file_lambda_arn" {
  value = aws_lambda_function.download_file.arn
}