/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 11:46 AM
 */
const BasicClient = require('../BasicClient');
const req_pre_mw = require('./req_pre_mw');
const res_sub_mw = require('./res_sub_mw');
class SaasClient extends BasicClient {
  constructor(config = {}, request_mws = [], response_mws = []) {
    request_mws.unshift(req_pre_mw);
    response_mws.push(res_sub_mw);
    super(config, request_mws, response_mws)
  }
}

module.exports = SaasClient;
