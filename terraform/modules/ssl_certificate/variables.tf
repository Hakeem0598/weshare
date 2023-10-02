variable "domain_name" {
    type = string
}

variable "route53_cname_records" {
  type = list(object({
    fqdn = string
  }))
}

variable "environment" {
    type = string   
}

variable "app_name" {
    type = string
}