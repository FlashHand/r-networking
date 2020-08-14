/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 3:12 PM
 */
import store from "@/store"
const {goLogin, isProd} = require("@/utils/util");
const {Message} = require("element-ui");
const storage = require("good-storage");
const axios = require("axios");
function isError (response) {
  let err = false
  if (response.data.code && response.data.code !== 0 && response.data.code !== 1) {
    err = true
  }

  if (response.data.error_code && response.data.error_code !== 0 && response.data.error_code !== 1) {
    err = true;
  }

  if (response.data.err_code && response.data.err_code !== 0 && response.data.err_code !== 1) {
    err = true
  }

  if (response.data.success && response.data.success === false) {
    err = true
  }
  if (err && window._czc && isProd()) {
    window._czc.push([
      "_trackEvent",
      "错误",
      "网络请求" + response.config.url,
      JSON.stringify(response.data),
      11,
      ""
    ]);
  }
  // token 失效，跳转到登陆
  if(response.data.code && response.data.code == 10001) {
    goLogin()
  }

}

const fullfilled = (response) => {
  store.dispatch('StatusType', response.status);
  isError(response);
  return response;
};
async function doRequest (error) {
  const res = error.response.data
  let user = storage.get('user')
  user.token = res.Authorization // store.dispatch('SetToken', res.Authorization)
  store.dispatch('SetToken', res.Authorization)
  let configSelf = error.response.config
  configSelf.baseURL = ''
  configSelf.headers.Authorization = res.Authorization
  const resa = await axios(configSelf)
  return resa
}
const rejected = error => {
  // if (window._czc && isProd()) {
  //   window._czc.push([
  //     "_trackEvent",
  //     "错误",
  //     "网络请求" + error.config.url,
  //     error.message,
  //     11,
  //     ""
  //   ]);
  // }
  // 生产环境钉钉接口错误监控
  // if (
  //   error && process.env.NODE_ENV === 'production'
  // ) {
  //   let urlData = ''
  //   let params = ''
  //   var xmlHttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
  //   xmlHttp.open('post', 'https://30336432.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/RYS_front-end_monitoring.version/front-end_monitor/', true);
  //   xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
  //   xmlHttp.onreadystatechange = function () {
  //     if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
  //       console.log('钉钉机器人错误报警成功')
  //     }
  //   };
  //   // get/post
  //   if (error.config.params) {
  //     params = JSON.stringify(error.config.params)
  //   } else {
  //     params = formatRequestParams(error.config.data)
  //   }
  //   if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
  //     urlData = `path=${error.config.url}&status=${error.message}&pathname=${window.location.pathname}&params=${params}&userType=sap&pathname=${window.location.pathname}`
  //   } else {
  //     urlData = `path=${error.response.data.path.toString()}&pathname=${window.location.pathname}&status=${error.response.data.status}&params=${params}&userType=sap&pathname=${window.location.pathname}`
  //   }
  //   xmlHttp.send(urlData);
  // // }
  // 超时
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    Message.error('请求超时')
    return Promise.reject(error)
  }
  // 错误提示
  if (error && error.response) {
    store.dispatch('StatusType', error.response.status)
    switch (error.response.status) {
      case 400:
        alert('请求错误')
        break
      case 403:
        Message.error('拒绝访问')
        break
      case 404:
        Message.error(`请求地址出错: ${error.response.config.url}`)
        break
      case 405:
        Message.error('方法不被允许')
        break
      case 408:
        Message.error('请求超时')
        break
      case 415:
        Message.error('415错误')
        break
      case 500:
        Message.error('服务器内部错误')
        break
      case 501:
        Message.error('服务未实现')
        break
      case 502:
        Message.error('网关错误')
        break
      case 503:
        Message.error('服务不可用')
        break
      case 504:
        Message.error('网关超时')
        break
      case 505:
        Message.error('HTTP版本不受支持')
        break
      default:
    }
    return Promise.reject(error)
  }
  if (error.response && error.response.status === 401) {
    if (error.response.data.code === 10004) {
      return doRequest(error)
    } else if (error.response.data.code === 10001) {
      Message.error('token过期,请重新登录')
      let firstLogin = window.localStorage.getItem('firstLogin')
      localStorage.clear()
      window.localStorage.setItem('firstLogin', firstLogin)
      goLogin()
    } else if (error.response.data.code === 10010) {
      let firstLogin = window.localStorage.getItem('firstLogin')
      localStorage.clear()
      window.localStorage.setItem('firstLogin', firstLogin)
      goLogin()
    } else {
      Message.error('未知错误,请重新登录')
      goLogin()
    }
  } else {
    return Promise.reject(error)
  }
};
module.exports = {
  fullfilled,
  rejected
}
