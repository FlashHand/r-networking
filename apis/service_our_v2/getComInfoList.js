/**
 * @ignore
 * @Description nothing
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/9/14 4:51 PM
 */
const service_serverless_v2 = require('../../service_providers/service_serverless/service_serverless_v2');
module.exports = (params = {_t: new Date().getTime()}) => {
  return service_serverless_v2.client.createGet('/api/sap/get_company_infos_by_user_id', params)
}
