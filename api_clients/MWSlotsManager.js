class MWClass {
  mws = [];
  constructor() {
    this.fullfilled = async (config) => {
      try {
        let finalConfig = config;
        for (let mw of this.mws) {
          if (mw.async){
            finalConfig = await mw.fullfilled(config);
          }else{
            finalConfig = mw.fullfilled(config);
          }
        }
        return finalConfig;
      }catch (e){
        return Promise.reject(e);
      }
    };
    this.rejected = (error) => {
      return Promise.reject(error);
    };
  }

  set(injectedMWs) {
    this.mws = injectedMWs;
  }
  concat(middlewares){
    this.mws.push(...middlewares);
  }
}

class MWSlotsManager {
  /**
   * @classdesc 中间件插槽管理器
   * @example
   * const SaasClient = require('r-networking').SaasClient;
   const auth = require('./networking/middlewares/request/auth');
   const error_handler = require('./networking/middlewares/response/error_handler');
   SaasClient.mw_slots_manager.req_pre.set([auth]);
   SaasClient.mw_slots_manager.res_sub.set([error_handler]);
   */
  constructor() {
    //请求前置插槽中间件
    this.req_pre = new MWClass();
    //请求后置插槽中间件
    this.res_pre = new MWClass();
    //返回前置插槽中间件
    this.req_sub = new MWClass();
    //返回后置插槽中间件
    this.res_sub = new MWClass();
  }

}

module.exports = MWSlotsManager;
