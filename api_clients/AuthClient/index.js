/**
 * @ignore
 * @Description nothing
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/11/14 7:05 PM
 */
const BasicClient = require('../BasicClient');

class AuthClient extends BasicClient {
  constructor(config = {}, request_mws = [], response_mws = []) {
    super(config, request_mws, response_mws)
  }
}
module.exports = AuthClient;

