const SaasClient = require("../api_clients/SaasClient");
const res_mapping_legacy = require('../middlewares/saas/response/res_mapping_legacy');
const generateClients = (service = '', request_mws = [], response_mws = []) => {
  let legacy_response_mws = new Array(...response_mws);
  legacy_response_mws.unshift(res_mapping_legacy);
  return {
    client: new SaasClient({service}, request_mws, response_mws),
    legacyClient: new SaasClient({service, isLegacy: true}, request_mws, legacy_response_mws),
    legacyRawClient: new SaasClient({service, isRaw: true, isLegacy: true}, request_mws, legacy_response_mws)
  }
};
module.exports = {
  generateClients
}
