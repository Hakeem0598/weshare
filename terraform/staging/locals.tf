data "aws_caller_identity" "current" {}

locals {
  environment       = "staging"
  account_id        = data.aws_caller_identity.current.account_id
  web_bucket_name   = "weshare-web-${md5("weshare-web-${local.account_id}-${var.aws_region}-${local.environment}")}"
  logs_bucket_name  = "weshare-logs-${md5("weshare-logs-${local.account_id}-${var.aws_region}-${local.environment}")}"
  files_bucket_name = "weshare-files-${md5("weshare-files-${local.account_id}-${var.aws_region}-${local.environment}")}"
}
