/**
 * @Description @ignore
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 11:10 AM
 */
const app_helper = require('../../../helpers/app_helper');
const fullfilled = response => {
  try {
    //data 是undefined时设为空对象
    if (response.data.data === undefined) response.data.data = {};
    response.data.code = parseInt(response.data.code);
    //登录失效鉴权
    let serviceCode = response.data.serviceCode;
    app_helper.checkLogin(serviceCode);
  } catch (e) {
    console.log(e);
  }
  return response
}
const rejected = error => {
  return {
    data:
      {
        code: '-12800',
        error_code: error.code,
        msg: error.message,
        config: error.config
      },
    config:error.config,
    status:200
  };}
module.exports = {
  name: 'res_handler',
  fullfilled,
  rejected
}
