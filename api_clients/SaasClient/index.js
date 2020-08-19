/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 11:46 AM
 */
const BasicClient = require('../BasicClient');

class SaasClient extends BasicClient {
  constructor(config = {}, request_mws = [], response_mws = []) {
    super(config, request_mws, response_mws)
  }
}

module.exports = SaasClient;
