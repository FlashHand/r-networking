/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/8 2:55 PM
 */
const PhpClient = require("../api_clients/PhpClient");
const res_mapping_legacy = require('../middlewares/common/response/res_mapping_legacy');
const generateClients = (service = '', request_mws = [], response_mws = []) => {
  let legacy_response_mws = new Array(...response_mws);
  legacy_response_mws.unshift(res_mapping_legacy);
  return {
    client: new PhpClient({service}, request_mws, response_mws),
    legacyClient: new PhpClient({service}, request_mws, legacy_response_mws),
    legacyRawClient: new PhpClient({service, isRaw: true}, request_mws, legacy_response_mws)
  }
};
module.exports = {
  generateClients
}
