/**
 * @Description 中间件插槽管理类
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/26 5:24 PM
 */
class MWClass {
  mws = [];
  fullfilled = (config) => {
    let finalConfig = config;
    for (let mw of this.mws){
      finalConfig = mw.fullfilled(config);
    }
    return finalConfig;
  };
  rejected = (error) => {
    return Promise.reject(error);
  };
  set(injectedMWs){
    this.mws = injectedMWs;
  }
  constructor() {

  }
}

class MWSlotsManager {
  req_pre = new MWClass();
  res_pre = new MWClass();
  req_sub = new MWClass();
  res_sub = new MWClass();
  constructor() {

  }

}

module.exports = MWSlotsManager;
