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
  name               = "${var.app_name}-${var.lambda_role_name}"
  assume_role_policy = data.aws_iam_policy_document.trust_policy.json
}

resource "aws_iam_role_policy_attachment" "attachment" {
  role       = aws_iam_role.execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}