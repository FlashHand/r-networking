const saas = require('./networking_utils/saas');
const service_providers = require('./service_providers');
const BasicClient = require('./api_clients/BasicClient');
const SaasClient = require('./api_clients/SaasClient');
/**
 * @module r-networking
 * @type {{utils: {saas: {generateClients: function(*=, *=, *=): {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}}}, service_providers: {our_v2: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, our_v1: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, tenant_v2: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, product_center_v2: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, serverless_package_v2: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, crm_customer_v2: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, crm_order_v2: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, finance_v2: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, agency_v2: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, account_v2: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, market: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, message_center_v2: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, product_v2: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, partner_v2: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, serverless_v2: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, common: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, crm_pool_v2: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, product_center: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, tenant_console_v2: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, report_v2: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, invoice_v2: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}, pub_partner_v2: {legacyClient: SaasClient, legacyRawClient: SaasClient, client: SaasClient}}, BasicClient: BasicClient, SaasClient: SaasClient}}
 */
module.exports = {

  utils:{
    saas
  },
  /**
   * @static BasicClient
   * @see BasicClient
   */
  BasicClient,
  /**
   * @static SaasClient
   * @see SaasClient
   */
  SaasClient,
  service_providers
}
