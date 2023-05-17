// src/basicClient.ts
import axios from "axios";
import qs from "qs";
var BasicClient = class {
  constructor(config, interceptors) {
    this.defaultConfig = {
      timeout: 2e4,
      headers: { "Content-Type": "application/json" }
    };
    this.defaultConfig = Object.assign(this.defaultConfig, config);
    this.axiosClient = axios.create(config);
    interceptors?.requestInterceptors?.forEach((interceptor) => {
      this.axiosClient.interceptors.request.use(interceptor.fullfilled, interceptor.rejected);
    });
    interceptors?.responseInterceptors?.forEach((interceptor) => {
      this.axiosClient.interceptors.response.use(interceptor.fullfilled, interceptor.rejected);
    });
  }
  /**
   * 设置baseURL
   * @param baseURL
   */
  setBaseURL(baseURL) {
    this.defaultConfig.baseURL = baseURL;
    this.axiosClient.defaults.baseURL = baseURL;
  }
  /**
   * 设置适配器
   * @param adapter
   */
  setAdapter(adapter) {
    this.defaultConfig.adapter = adapter;
    this.axiosClient.defaults.adapter = adapter;
  }
  /**
   * 创建一个post请求函数,支持自定义AxiosRequestConfig
   * @param url
   * @param params
   * @param config
   */
  async post(url, params, config) {
    const postConfig = Object.assign({}, this.defaultConfig, config);
    const res = await this.axiosClient.post(url, params, postConfig);
    return res.data;
  }
  /**
   * 创建一个get请求函数,支持自定义AxiosRequestConfig
   * @param url
   * @param params
   * @param config
   */
  async get(url, params, config) {
    const getConfig = {
      params,
      paramsSerializer: (params2) => {
        return qs.stringify(params2, { arrayFormat: "indices" });
      }
    };
    const currentConfig = Object.assign(getConfig, this.defaultConfig);
    const res = await this.axiosClient.get(url, currentConfig);
    return res.data;
  }
  setRequestInterceptors(interceptor) {
    interceptor.forEach((interceptor2) => {
      this.axiosClient.interceptors.request.use(interceptor2.fullfilled, interceptor2.rejected);
    });
  }
  setResponseInterceptors(interceptor) {
    interceptor.forEach((interceptor2) => {
      this.axiosClient.interceptors.response.use(interceptor2.fullfilled, interceptor2.rejected);
    });
  }
};

// src/index.ts
var rClient = new BasicClient();
export {
  BasicClient,
  rClient
};
