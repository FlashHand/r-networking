/**
 * @Description 中间件插槽管理类
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/26 5:24 PM
 */
class MWClass {
  constructor() {
    this.mws = [];
    this.fullfilled = (config) => {
      let finalConfig = config;
      for (let mw of this.mws){
        finalConfig = mw.fullfilled(config);
      }
      return finalConfig;
    };
    this.rejected = (error) => {
      for (let mw of this.mws){
        mw.rejected(error);
      }
      return Promise.reject(error);
    };
  }
  set(injectedMWs){
    this.mws = injectedMWs;
  }
}

class MWSlotsManager {
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
