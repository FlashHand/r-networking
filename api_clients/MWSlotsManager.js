class MWClass {
  constructor() {
    this.mws = [];
    this.fullfilled = (config) => {
      let finalConfig = config;
      for (let mw of this.mws) {
        finalConfig = mw.fullfilled(config);
      }
      return finalConfig;
    };
    this.rejected = (error) => {
      for (let mw of this.mws) {
        mw.rejected(error);
      }
      return Promise.reject(error);
    };
  }

  set(injectedMWs) {
    this.mws = injectedMWs;
  }
}

class MWSlotsManager {
  /**
   * @classdesc 中间件插槽管理器
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
