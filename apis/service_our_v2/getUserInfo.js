import {ourLegacyClient} from "rys-sap/src/api/public_service";

/**
 * @ignore
 * @Description nothing
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/9/14 4:51 PM
 */
const service_our_v2 = require('../../service_providers/service_our/service_our_v2');
module.exports = (params = {_t: new Date().getTime()}) => {
  return service_our_v2.client.createGet('/user_info_get', params)
}
