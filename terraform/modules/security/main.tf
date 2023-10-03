data "aws_iam_policy_document" "trust_policy" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "execution_role" {
  name               = "${var.app_name}-${var.lambda_role_name}-${var.environment}"
  assume_role_policy = data.aws_iam_policy_document.trust_policy.json
}

resource "aws_iam_role_policy_attachment" "attachment" {
  role       = aws_iam_role.execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "aws_iam_policy_document" "files_bucket_policy" {
  statement {
    effect = "Allow"
    actions = [
      "s3:PutObject",
      "s3:GetObject"
    ]
    resources = ["${var.files_bucket_arn}/*"]
  }

  statement {
    effect = "Allow"
    actions = [
      "s3:ListBucket",
    ]
    resources = [var.files_bucket_arn]
  }
}

resource "aws_iam_policy" "files_bucket_policy" {
  name   = "${var.app_name}-s3-access-${var.environment}"
  policy = data.aws_iam_policy_document.files_bucket_policy.json
}

resource "aws_iam_role_policy_attachment" "files_bucket_policy" {
  role       = aws_iam_role.execution_role.name
  policy_arn = aws_iam_policy.files_bucket_policy.arn
}
