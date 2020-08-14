/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 3:04 PM
 */
const {getCookie} = require("@/utils/store");
const {goLogin} = require("@/utils/util");

const fullfilled = (config) => {
  let token = getCookie('token') || '';
  if (token) {
    config.headers.Authorization = token;
  } else {
    if (location.href.indexOf('?') === -1) {
      goLogin()
    }
  }
  return config
};
const rejected = error => {
  console.log(error)
};
module.exports =  {fullfilled, rejected}
