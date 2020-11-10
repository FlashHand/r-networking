/**
 * @module service_providers
 * @desc **common**不推荐使用！是一个没有注入微服务根路由的provider，可以用来对接任何接口，但由于common对接的多种微服务时中间件作用域无法根据微服务区分。
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/9/4 6:59 PM
 */
module.exports = {
  /**
   * @static common
   * @desc 无微服务，根路由为/
   *
   * 功能范围:所有
   */
  common: require('./service_common/service_common'),
  /**
   * @static account_web_v2
   * @desc 微服务:/account-web/v2
   *
   * 功能范围：
   */
  account_web_v2: require('./service_account-web/service_account-web_v2'),
  /**
   * @static agency_web_v2
   * @desc 微服务:/agency-web/v2
   *
   * 功能范围:
   */
  agency_web_v2: require('./service_agency-web/service_agency-web_v2'),
  /**
   * @static crm_customer
   * @desc 微服务:/crm-customer
   *
   * 功能范围:
   */
  crm_customer: require('./service_crm-customer/service_crm-customer'),
  /**
   * @static crm_order_v2
   * @desc 微服务:/crm-order/v2
   *
   * 功能范围:
   */
  crm_order_v2: require('./service_crm-order/service_crm-order_v2'),
  /**
   * @static crm_pool
   * @desc 微服务:/crm-pool
   *
   * 功能范围:
   */
  crm_pool: require('./service_crm-pool/service_crm-pool'),
  /**
   * @static finance_v2
   * @desc 微服务:/finance/v2
   *
   * 功能范围:
   */
  finance_v2: require('./service_finance/service_finance_v2'),
  /**
   * @static ims
   * @desc 微服务:/ims
   *
   * 功能范围:
   */
  ims: require('./service_ims/service_ims'),
  /**
   * @static invoice_v2
   * @desc 微服务:/invoice/v2
   *
   * 功能范围:
   */
  invoice_v2: require('./service_invoice/service_invoice_v2'),
  /**
   * @static market
   * @desc 微服务:/market
   *
   * 功能范围:
   */
  market: require('./service_market/service_market'),
  /**
   * @static message_center_v2
   * @desc 微服务:/message-center/v2
   *
   * 功能范围:
   */
  message_center_v2: require('./service_message-center/service_message-center_v2'),
  /**
   * @static our_v1
   * @desc 微服务:/our/v1
   *
   * 功能范围:
   */
  our_v1: require('./service_our/service_our_v1'),
  /**
   * @static our_v2
   * @desc 微服务:/our/v2
   *
   * 功能范围:
   */
  our_v2: require('./service_our/service_our_v2'),
  /**
   * @static partner_v2
   * @desc 微服务:/partner/v2
   *
   * 功能范围:
   */
  partner_v2: require('./service_partner/service_partner_v2'),
  /**
   * @static product_v2
   * @desc 微服务:/product/v2
   *
   * 功能范围:
   */
  product_v2: require('./service_product/service_product_v2'),
  /**
   * @static product_center_v2
   * @desc 微服务:/product-center/v2
   *
   * 功能范围:
   */
  product_center_v2: require('./service_product-center/service_product-center_v2'),
  /**
   * @static product_center_v2_special
   * @desc 微服务:/product-center/v2，使用额外的中间件处理特殊数据：
   *
   * require("../../middlewares/saas/response/res_err_msg");
   *
   * 功能范围:使用额外的中间件处理特殊数据
   */
  product_center_v2_special: require('./service_product-center/service_product-center_v2_special.js'),
  /**
   * @static queqiao_platform
   * @desc 微服务:/queqiao-platform
   *
   * 功能范围:
   */
  queqiao_platform: require('./service_queqiao-platform/service_queqiao-platform'),
  /**
   * @static queqiao_v2
   * @desc 微服务:/queqiao/v2
   *
   * 功能范围:
   */
  queqiao_v2: require('./service_queqiao/service_queqiao_v2'),
  /**
   * @static report_v2
   * @desc 微服务:/report/v2
   *
   * 功能范围:
   */
  report_v2: require('./service_report/service_report_v2'),
  /**
   * @static rys_coupon
   * @desc 微服务:/rys-coupon
   *
   * 功能范围:
   */
  rys_coupon: require('./service_rys-coupon/service_rys-coupon_v2'),
  /**
   * @static serverless_v2
   * @desc 微服务:/serverless/v2
   *
   * 功能范围:
   */
  serverless_v2: require('./service_serverless/service_serverless_v2'),
  /**
   * @static serverless_package_v2
   * @desc 微服务:/serverless-package/v2
   *
   * 功能范围:
   */
  serverless_package_v2: require('./service_serverless-package/service_serverless-package_v2'),
  /**
   * @static tax_console
   * @desc 微服务:/tax-console
   *
   * 功能范围:
   */
  tax_console: require('./service_tax-console/service_tax-console'),
  /**
   * @static tenant_console_v2
   * @desc 微服务:/tenant-console/v2
   *
   * 功能范围:
   */
  tenant_console_v2: require('./service_tenant-console/service_tenant-console_v2'),
  /**
   * @static tenant_console
   * @desc 微服务:/tenant-console
   *
   * 功能范围:
   */
  tenant_console: require('./service_tenant-console/service_tenant-console')
}
