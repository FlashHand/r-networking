const BasicClient = require('../BasicClient');
const MWSlotsManager = require('../MWSlotsManager');
const res_handler = require('./res_handler');
const mw_slots_manager = new MWSlotsManager();

class RysClient extends BasicClient {
  /**
   * @description 继承于{@link  BasicClient}
   * @classdesc 默认header是：{'Content-Type':'application/json'}
   *
   * baseURL默认使用的环境变量有VUE_APP_BASE_URL,VUE_APP_API_ROOT,API_ROOT,VUE_APP_BASE_URL
   *
   * 开发前请查看{@link https://www.yuque.com/rongyisuan/iianmg/oesl8u|前端接口规范文档}
   * @example create a instance
   * const saas = require('../../networking_utils/saas');
   * module.exports = saas.generateClients('/report/v2');
   * @param {{service: string}} [config={isRaw:false}] http client 的配置
   * @param {boolean} [config.isRaw=false] 是否直接返回AxiosResponse实例
   * @param {object[]} [request_mws=[]]  请求中间件队列
   * @param {object[]} [response_mws=[]]  返回中间件队列
   */
  constructor(config = {}, request_mws = [], response_mws = []) {
    request_mws.unshift(mw_slots_manager.req_pre);
    request_mws.push(mw_slots_manager.req_sub);
    response_mws.unshift(mw_slots_manager.res_pre);
    response_mws.push(mw_slots_manager.res_sub);
    response_mws.unshift(res_handler);

    super(config, request_mws, response_mws)
  }
}

/**
 * @static RysClient.mw_slots_manager
 * @desc 中间件插槽
 */
RysClient.mw_slots_manager = mw_slots_manager;

RysClient.createClient = (service = '', request_mws = [], response_mws = [])=>{
  return new RysClient({service}, request_mws, response_mws);
}
RysClient.createRawClient = (service = '', request_mws = [], response_mws = [])=>{
  return new RysClient({service,isRaw:true}, request_mws, response_mws);
}

module.exports = RysClient;
