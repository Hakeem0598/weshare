resource "aws_cognito_user_pool" "user_pool" {
  name = "${var.app_name}-user-pool-${var.environment}"

  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]
  password_policy {
    minimum_length    = 12
    require_lowercase = true
    require_uppercase = true
    require_numbers   = true
    require_symbols   = true
  }

  schema {
    attribute_data_type = "String"
    mutable             = true
    name                = "tenant"
    string_attribute_constraints {
      min_length = 2
      max_length = 16
    }
  }

  schema {
    attribute_data_type = "String"
    mutable             = true
    name                = "tier"
    string_attribute_constraints {
      min_length = 2
      max_length = 16
    }
  }
}

locals {
  callback_url = var.environment == "production" ? "https://${var.domain_name}/auth/callback" : "https://${var.environment}.${var.domain_name}/auth/callback"
}

resource "aws_cognito_user_pool_client" "upc" {
  name         = "${var.app_name}-client-${var.environment}"
  user_pool_id = aws_cognito_user_pool.user_pool.id

  generate_secret                      = true
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_scopes                 = ["openid"]
  access_token_validity                = 1
  id_token_validity                    = 1
  refresh_token_validity               = 30
  allowed_oauth_flows_user_pool_client = true
  supported_identity_providers         = ["COGNITO"]
  callback_urls                        = [local.callback_url]
  default_redirect_uri                 = local.callback_url
  explicit_auth_flows                  = ["ALLOW_REFRESH_TOKEN_AUTH", "ALLOW_USER_SRP_AUTH"]
  write_attributes                     = ["email"]
}


locals {
  formatted_domain_name = replace(var.domain_name, ".", "-")
}

resource "aws_cognito_user_pool_domain" "upd" {
  domain       = "${local.formatted_domain_name}-auth-${var.environment}"
  user_pool_id = aws_cognito_user_pool.user_pool.id
}
