output "client_id" {
  value = aws_cognito_user_pool_client.upc.id
}

output "client_secret" {
  value = aws_cognito_user_pool_client.upc.client_secret
}

output "user_pool_domain" {
  value = aws_cognito_user_pool_domain.upd.domain
}