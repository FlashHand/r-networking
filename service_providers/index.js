/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/9/4 6:59 PM
 */
module.exports = {
  account_v2:require('./service_account/service_account_v2'),
  agency_v2:require('./service_agency/service_agency_v2'),
  common: require('./service_common/service_common'),
  crm_customer_v2: require('./service_crm-customer/service_crm-customer_v2'),
  crm_order_v2: require('./service_crm-order/service_crm-order_v2'),
  crm_pool_v2:require('./service_crm-pool/service_crm-pool_v2'),
  finance_v2:require('./service_finance/service_finance_v2'),
  invoice_v2:require('./service_invoice/service_invoice_v2'),
  market:require('./service_market/service_market'),
  message_center_v2:require('./service_message-center/service_message-center_v2'),
  our_v1: require('./service_our/service_our_v1'),
  our_v2: require('./service_our/service_our_v2'),
  partner_v2:require('./service_partner/service_partner_v2'),
  product_v2:require('./service_product/service_product_v2'),
  product_center:require('./service_product-center/service_product-center'),
  product_center_v2:require('./service_product-center/service_product-center_v2.js'),
  pub_partner_v2:require('./service_pub-partner/service_pub-partner_v2'),
  report_v2:require('./service_report/service_report_v2'),
  serverless_v2:require('./service_serverless/service_serverless_v2'),
  serverless_package_v2:require('./service_serverless-package/service_serverless-package_v2'),
  tenant_v2:require('./service_tenant/service_tenant_v2'),
  tenant_console_v2:require('./service_tenant-console/service_tenant-console_v2')
}
