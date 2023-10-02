output "files_bucket_invoke_arn" {
  value = aws_s3_bucket.files_bucket.bucket_regional_domain_name
}

output "logs_bucket_domain_name" {
  value = aws_s3_bucket.logs_bucket.bucket_domain_name
}

output "web_bucket_regional_domain_name" {
  value = aws_s3_bucket.web_bucket.bucket_regional_domain_name
}

output "web_bucket" {
  value = aws_s3_bucket.web_bucket.bucket
}