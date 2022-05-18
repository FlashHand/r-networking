/**
 * @ignore
 * @Description nothing
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/9/19 10:25 AM
 */
const service_code_helper = require('../service_code_helper');

// 全局单例
let appInfo = {
  loginURL: null
}
const registerAPP = (info) => {
  appInfo = info;
}
const goLogin = ()=>{
  if (appInfo.loginURL) {
    window.location.href = appInfo.loginURL;
  }
}
const checkLogin = (serviceCode)=>{
  if (service_code_helper.isTokenInvalid(serviceCode)){
    goLogin();
  }
}

module.exports = {
  registerAPP,
  getAppInfo(){
    return appInfo;
  },
  goLogin,
  checkLogin
}
