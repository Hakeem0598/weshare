# WEB BUCKET
resource "aws_s3_bucket" "web_bucket" {
  bucket        = var.web_bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "block_web_bucket_public_access" {
  bucket = aws_s3_bucket.web_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "web_bucket_versioning" {
  bucket = aws_s3_bucket.web_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "web_bucket_sse" {
  bucket = aws_s3_bucket.web_bucket.id

  rule {
    bucket_key_enabled = true
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_cors_configuration" "web_bucket_cors_config" {
  bucket = aws_s3_bucket.web_bucket.id

  cors_rule {
    allowed_methods = ["PUT", "POST", "GET", "DELETE", "HEAD"]
    allowed_headers = ["*"]
    allowed_origins = ["*"]
  }
}

data "aws_iam_policy_document" "cloudfront_policy" {
  statement {
    effect = "Allow"
    actions = [
      "s3:GetObject"
    ]
    resources = ["${aws_s3_bucket.web_bucket.arn}/*"]
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    condition {
      test     = "StringEquals"
      values   = [var.cloudfront_distribution_arn]
      variable = "aws:SourceArn"
    }
  }
}

resource "aws_s3_bucket_policy" "allow_cloudfront" {
  bucket = aws_s3_bucket.web_bucket.id
  policy = data.aws_iam_policy_document.cloudfront_policy.json
}

# CLOUDFRONT LOGS BUCKET
resource "aws_s3_bucket" "logs_bucket" {
  bucket        = var.logs_bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "logs_bucket_block_public_access" {
  bucket = aws_s3_bucket.logs_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "logs_bucket_versioning" {
  bucket = aws_s3_bucket.logs_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "logs_bucket_encryption" {
  bucket = aws_s3_bucket.logs_bucket.id

  rule {
    bucket_key_enabled = true
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_ownership_controls" "logs_bucket_ownership_controls" {
  bucket = aws_s3_bucket.logs_bucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "acl" {
  depends_on = [aws_s3_bucket_ownership_controls.logs_bucket_ownership_controls]

  bucket = aws_s3_bucket.logs_bucket.id
  acl    = "private"
}

data "aws_iam_policy_document" "logs_bucket_policy" {
  statement {
    effect    = "Allow"
    actions   = ["s3:PutObject"]
    resources = ["${aws_s3_bucket.logs_bucket.arn}/*"]
    principals {
      type        = "Service"
      identifiers = ["delivery.logs.amazonaws.com"]
    }
  }

  statement {
    effect = "Allow"
    actions = [
      "s3:GetBucketAcl",
      "s3:PutBucketAcl",
    ]
    resources = [aws_s3_bucket.logs_bucket.arn]
    principals {
      type        = "Service"
      identifiers = ["delivery.logs.amazonaws.com"]
    }
  }
}

resource "aws_s3_bucket_policy" "logs_bucket_policy" {
  bucket = aws_s3_bucket.logs_bucket.id
  policy = data.aws_iam_policy_document.logs_bucket_policy.json
}

# FILES BUCKET
resource "aws_s3_bucket" "files_bucket" {
  bucket        = var.files_bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "block_files_bucket_public_access" {
  bucket = aws_s3_bucket.files_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "files_bucket_versioning" {
  bucket = aws_s3_bucket.files_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "files_bucket_sse" {
  bucket = aws_s3_bucket.files_bucket.id

  rule {
    bucket_key_enabled = true
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_cors_configuration" "files_bucket_cors_config" {
  bucket = aws_s3_bucket.files_bucket.id

  cors_rule {
    allowed_methods = ["PUT", "POST", "GET", "DELETE", "HEAD"]
    allowed_headers = ["*"]
    allowed_origins = ["*"]
  }
}
