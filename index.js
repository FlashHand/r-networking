const saas = require('./networking_utils/saas');
const service_providers = require('./service_providers');
const BasicClient = require('./api_clients/BasicClient');
const SaasClient = require('./api_clients/SaasClient');
/**
 * @module r-networking
 * @desc **common**不推荐使用！是一个没有注入微服务根路由的provider，可以用来对接任何接口，但由于common对接的多种微服务时中间件作用域无法根据微服务区分。
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/9/4 6:59 PM
 */
module.exports = {
  /**
   * @static utils
   * @desc networking_utils用于生成http client暂无外部调用需求
   */
  utils:{
    saas
  },
  /**
   * @static BasicClient
   * @see BasicClient
   */
  BasicClient,
  /**
   * @static SaasClient
   * @see SaasClient
   */
  SaasClient,
  /**
   * @static service_providers
   * @desc {@link module:service_providers}
   */
  service_providers
}
