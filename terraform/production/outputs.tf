output "cloudfront_distribution_id" {
  value = module.cdn.cloudfront_distribution_id
}

output "web_bucket" {
  value = module.storage.web_bucket
}
