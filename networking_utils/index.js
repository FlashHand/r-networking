const SaasClient = require("../api_clients/SaasClient");
const generateClient = (service = '', request_mws = [], response_mws = []) => {
  return new SaasClient({service}, request_mws, response_mws);
};
module.exports = {
  generateClient
}
