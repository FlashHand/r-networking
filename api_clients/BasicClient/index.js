/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 11:46 AM
 */
const axios = require('axios');
const qs = require('qs');
const resHandler = (res,isRaw=false)=>{
  return isRaw ? res : res.data;
}
class BasicClient {
  constructor(config = {isRaw:false}, request_mws = [], response_mws = []) {
    //为请求和返回中间件数组，增加中间件头尾插槽
    let baseURL = process.env.VUE_APP_BASE_URL||process.env.VUE_APP_API_ROOT||process.env.API_ROOT||process.env.VUE_APP_BASE_URL;
    let timeout = 20000;
    this.isRaw = config.isRaw;
    if (typeof config.baseURL === 'string') {
      baseURL = config.baseURL;
    }
    if (typeof config.service === 'string') {
      baseURL = baseURL + config.service;
    }
    this.httpClient = axios.create();

    const headers = {'Content-Type':'application/json'};
    const options = {
      baseURL,
      timeout,
      headers
    }

    console.log('option',options)
    this.httpClient = axios.create(options);
    request_mws.forEach(mw => {
      this.httpClient.interceptors.request.use(mw.fullfilled, mw.rejected);
    });
    response_mws.forEach(mw => {
      this.httpClient.interceptors.response.use(mw.fullfilled, mw.rejected);
    });
  }

  createGet(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(url, {
        params,
        paramsSerializer: params => {
          return qs.stringify(params, {arrayFormat: 'indices'})
        }
      }).then(res => {
        resolve(resHandler(res,this.isRaw));
      }).catch(e => {
        reject(e);
      });
    });
  }

  createGetBlob(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(url, {
        responseType: 'blob',
        params,
        paramsSerializer: params => {
          return qs.stringify(params, {arrayFormat: 'indices'})
        }
      }).then(res => {
        resolve(resHandler(res, this.isRaw));
      }).catch(e => {
        reject(e)
      })
    })
  }

  createPostJSON(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, params).then(res => {
        resolve(resHandler(res,this.isRaw));
      }).catch(e => {
        reject(e);
      });
    })
  }

  createPost(url, params = {}, type = '') {
    return new Promise((resolve, reject) => {
      let headers = {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}};
      this.httpClient.post(url, qs.stringify(params, type), headers).then(res => {
        resolve(resHandler(res,this.isRaw));
      }).catch(e => {
        reject(e);
      });
    })
  }

  createPut(url, params = {}, type = '') {
    let headers = {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}};
    return new Promise((resolve, reject) => [
      this.httpClient.put(url, qs.stringify(params, type),headers).then(res => {
        resolve(resHandler(res,this.isRaw));
      }).catch(e => {
        reject(e);
      })
    ])
  }

  createPutBody(url, params = {}, type = '') {
    let headers = {headers: {'Content-Type': 'application/json;charset=utf-8'}};
    return new Promise((resolve, reject) => [
      this.httpClient.put(url, params).then(res => {
        resolve(resHandler(res,this.isRaw));
      }).catch(e => {
        reject(e);
      })
    ])
  }

  createPostFile(url, formData) {
    let headers = {headers: {'Content-Type': 'multipart/form-data'}};
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, formData, headers).then(res => {
        resolve(resHandler(res,this.isRaw));
      }).catch(e => {
        reject(e)
      })
    })
  }

  createPostForm(url, params = {}) {
    return new Promise((resolve, reject) => {
      let headers = {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}};
      this.httpClient.post(url, qs.stringify(params, {arrayFormat: 'indices', allowDots: true}),headers).then(res => {
        resolve(resHandler(res,this.isRaw))

      }).catch(e => {
        reject(e)
      })
    })
  }
  createDelete(url, params = {}){
    return new Promise((resolve, reject) => {
      this.httpClient.delete(url, {params}).then(res => {
        resolve(resHandler(res,this.isRaw))

      }).catch(e => {
        reject(e)
      })
    })
  }

}

module.exports = BasicClient;
