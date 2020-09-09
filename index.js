const saas = require('./networking_utils/saas');
const service_providers = require('./service_providers');
const BasicClient = require('./api_clients/BasicClient');
const SaasClient = require('./api_clients/SaasClient');
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
