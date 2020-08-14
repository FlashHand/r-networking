/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 11:46 AM
 */
const BasicClient = require('../BasicClient');
const auth = require("../../middlewares/request/auth");
const error_handler = require('../../middlewares/response/error_handler');
const res_mapping_legacy = require('../../middlewares/response/res_mapping_legacy');

class RYSClient extends BasicClient {
  constructor(config = {}, request_mws = [], response_mws = []) {
    if (config.isLegacy) {
      response_mws.unshift(res_mapping_legacy);
    }
    request_mws.unshift(auth);
    response_mws.push(error_handler);
    super(config, request_mws, response_mws)
  }
}
module.exports = RYSClient;
