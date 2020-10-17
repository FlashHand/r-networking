/**
 * @ignore
 * @Description nothing
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/9/14 4:57 PM
 */
const service_our_v2 = require('../../service_providers/service_our/service_our_v2');
module.exports = () => {
  return service_our_v2.client.createGet('/pub/third_area_list')
}

