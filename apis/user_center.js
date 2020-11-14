/**
 * @ignore
 * @Description nothing
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/9/14 4:57 PM
 */
const user_center = require('../../service_providers').user_center;
module.exports = (params = {_t: new Date().getTime()}) => {
  return service_serverless_v2.client.createPostJSON('/api/sap/voucherTempManage/newTemp', params)
}
