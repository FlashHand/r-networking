/**
 * @description basic
 * @ignore
 */
const axios = require('axios');
const qs = require('qs');
const resHandler = (res, isRaw = false) => {
  return isRaw ? res : res.data;
}

class BasicClient {
  /**
   * @description http client 基类,你不应该直接用BasicClient创建client实例，
   * 应该继承BasicClient去使用，如{@link  SaasClient}
   * @classdesc 默认header是：{'Content-Type':'application/json'}
   *
   * baseURL默认使用的环境变量有VUE_APP_BASE_URL,VUE_APP_API_ROOT,API_ROOT,VUE_APP_BASE_URL
   *
   * 开发前请查看{@link https://www.yuque.com/rongyisuan/iianmg/oesl8u|前端接口规范文档}
   * @example
   * create a instance
   * const client = new BasicClient();
   * @param {object} [config={isRaw:false,service:""}] http client 的配置
   * @param {boolean} [config.isRaw=false] 是否直接返回AxiosResponse实例
   * @param {string} [config.service=""] 默认服务名为空，可以指定服务名，会自动添加的client实例的baseURL中。
   * 如：service:"our-v1";baseURL会变成http://api.domain.com/our-v1
   * @param {object[]} [request_mws=[]]  请求中间件队列
   * @param {object[]} [response_mws=[]]  返回中间件队列
   */
  constructor(config = {isRaw: false}, request_mws = [], response_mws = []) {
    //为请求和返回中间件数组，增加中间件头尾插槽
    let baseURL = process.env.VUE_APP_BASE_URL || process.env.VUE_APP_API_ROOT || process.env.API_ROOT || process.env.VUE_APP_BASE_URL;
    let timeout = 20000;
    this.isRaw = config.isRaw;
    if (typeof config.baseURL === 'string') {
      baseURL = config.baseURL;
    }
    if (typeof config.service === 'string') {
      baseURL = baseURL + config.service;
    }
    this.httpClient = axios.create();

    const headers = {'Content-Type': 'application/json'};
    const options = {
      baseURL,
      timeout,
      headers
    }
    this.httpClient = axios.create(options);
    request_mws.forEach(mw => {
      this.httpClient.interceptors.request.use(mw.fullfilled, mw.rejected);
    });
    response_mws.forEach(mw => {
      this.httpClient.interceptors.response.use(mw.fullfilled, mw.rejected);
    });
  }

  /**
   * @description 创建get请求api
   * @param url
   * @param params
   * @returns {Promise<Object>}
   */
  createGet(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(url, {
        params,
        paramsSerializer: params => {
          return qs.stringify(params, {arrayFormat: 'indices'})
        }
      }).then(res => {
        resolve(resHandler(res, this.isRaw));
      }).catch(e => {
        reject(e);
      });
    });
  }

  /**
   * @description 创建get请求，获取二进制文件
   * @param url
   * @param params
   * @returns {Promise<unknown>}
   */
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

  /**
   * @description 创建post请求，获取二进制文件
   * @param url
   * @param params
   * @returns {Promise<unknown>}
   */
  createPostBlob(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, params, {
        responseType: 'blob',
      }).then(res => {
        resolve(resHandler(res, this.isRaw));
      }).catch(e => {
        reject(e)
      })
    })
  }

  /**
   * @description 创建post请求，header是application/json
   * @param url
   * @param params
   * @returns {Promise<unknown>}
   */
  createPostJSON(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, params).then(res => {
        resolve(resHandler(res, this.isRaw));
      }).catch(e => {
        reject(e);
      });
    })
  }

  /**
   * @deprecated 请改用{@link  BasicClient#createPostJSON}**此接口已经不符合规范，历史遗留，不要使用**
   * @description 请改用{@link  BasicClient#createPostJSON}创建post请求，此接口废弃
   * header:{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}}
   * @param url
   * @param params
   * @param type
   * @returns {Promise<unknown>}
   */
  createPost(url, params = {}, type = {}) {
    return new Promise((resolve, reject) => {
      let headers = {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}};
      this.httpClient.post(url, qs.stringify(params, type), headers).then(res => {
        resolve(resHandler(res, this.isRaw));
      }).catch(e => {
        reject(e);
      });
    })
  }

  /**
   * @deprecated **请改用createPostJSON,此api已经不符合规范，历史遗留，不要使用**
   * @description 请改用{@link  BasicClient#createPostJSON}创建post请求，此接口废弃
   * {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}};
   * @param url
   * @param params
   * @param type
   * @returns {Promise<unknown>}
   */
  createPut(url, params = {}, type = {}) {
    let headers = {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}};
    return new Promise((resolve, reject) => [
      this.httpClient.put(url, qs.stringify(params, type), headers).then(res => {
        resolve(resHandler(res, this.isRaw));
      }).catch(e => {
        reject(e);
      })
    ])
  }

  /**
   * @deprecated **请改用createPostJSON,此api已经不符合规范，历史遗留，不要使用**
   * @description 请改用{@link  BasicClient#createPostJSON}创建post请求，此接口废弃
   * {headers: {'Content-Type': 'application/json;charset=utf-8'}};
   * @param url
   * @param params
   * @param type
   * @returns {Promise<unknown>}
   */
  createPutBody(url, params = {}, type = {}) {
    let headers = {headers: {'Content-Type': 'application/json;charset=utf-8'}};
    return new Promise((resolve, reject) => [
      this.httpClient.put(url, params, headers).then(res => {
        resolve(resHandler(res, this.isRaw));
      }).catch(e => {
        reject(e);
      })
    ])
  }

  /**
   * @deprecated **请改用createPostJSON,此api已经不符合规范，历史遗留，不要使用**
   * @description 请改用{@link  BasicClient#createPostJSON}创建post请求，此接口废弃
   * @param url
   * @param params
   * @returns {Promise<unknown>}
   */
  createPutJSON(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.httpClient.put(url, params).then(res => {
        resolve(resHandler(res, this.isRaw));
      }).catch(e => {
        reject(e);
      });
    })
  }

  /**
   * @deprecated **请改用ali oss sdk,此api已经不符合规范，历史遗留，不要使用**
   * @description  上传文件
   * {headers: {'Content-Type': 'multipart/form-data'}}\
   * @param url
   * @param formData
   * @returns {Promise<unknown>}
   */
  createPostFile(url, formData) {
    let headers = {headers: {'Content-Type': 'multipart/form-data'}};
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, formData, headers).then(res => {
        resolve(resHandler(res, this.isRaw));
      }).catch(e => {
        reject(e)
      })
    })
  }

  /**
   * @deprecated **请改用createPostJSON,此api已经不符合规范，历史遗留，不要使用**
   * @description 请改用{@link  BasicClient#createPostJSON}创建post请求，此接口废弃
   * {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}}
   *
   * qs.stringify(params, {arrayFormat: 'indices', allowDots: true}
   * @param url
   * @param params
   * @returns {Promise<unknown>}
   */
  createPostForm(url, params = {}) {
    return new Promise((resolve, reject) => {
      let headers = {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}};
      this.httpClient.post(url, qs.stringify(params, {arrayFormat: 'indices', allowDots: true}), headers).then(res => {
        resolve(resHandler(res, this.isRaw))

      }).catch(e => {
        reject(e)
      })
    })
  }

  /**
   * @deprecated **请改用createPostJSON,此api已经不符合规范，历史遗留，不要使用**
   * @description 请改用{@link  BasicClient#createPostJSON}创建post请求，此接口废弃
   * @param url
   * @param params
   * @returns {Promise<unknown>}
   */
  createDelete(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(url, {params}).then(res => {
        resolve(resHandler(res, this.isRaw))

      }).catch(e => {
        reject(e)
      })
    })
  }
}

module.exports = BasicClient;
