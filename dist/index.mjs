// src/rClient.ts
import axios from "axios";
var RClient = class {
  constructor(option) {
    this.defaultConfig = {
      timeout: 2e4,
      headers: { "Content-Type": "application/json" }
    };
    if (option) {
      this.defaultConfig = Object.assign(this.defaultConfig, option.config);
      this._axiosClient = axios.create(this.defaultConfig);
      option.interceptors?.requestInterceptors.forEach((interceptor) => {
        this._axiosClient.interceptors.request.use(
          interceptor.fullfilled,
          interceptor.rejected
        );
      });
      option.interceptors?.responseInterceptors.forEach((interceptor) => {
        this._axiosClient.interceptors.response.use(
          interceptor.fullfilled,
          interceptor.rejected
        );
      });
    } else {
      this._axiosClient = axios.create(this.defaultConfig);
    }
  }
  setRequestInterceptors(interceptors) {
    this._axiosClient.interceptors.request.clear();
    interceptors.forEach((interceptor) => {
      this._axiosClient.interceptors.request.use(
        interceptor.fullfilled,
        interceptor.rejected
      );
    });
  }
  setResponseInterceptors(interceptors) {
    this._axiosClient.interceptors.response.clear();
    interceptors.forEach((interceptor) => {
      this._axiosClient.interceptors.response.use(
        interceptor.fullfilled,
        interceptor.rejected
      );
    });
  }
  appendRequestInterceptor(interceptor) {
    this._axiosClient.interceptors.request.use(interceptor.fullfilled, interceptor.rejected);
  }
  appendResponseInterceptor(interceptor) {
    this._axiosClient.interceptors.response.use(interceptor.fullfilled, interceptor.rejected);
  }
  setBaseURL(baseURL) {
    this.defaultConfig.baseURL = baseURL;
    this._axiosClient.defaults.baseURL = baseURL;
  }
  setAdapter(adapter) {
    this.defaultConfig.adapter = adapter;
    this._axiosClient.defaults.adapter = adapter;
  }
  post(url, postConfig) {
    let body = null;
    if (postConfig?.body) {
      body = postConfig.body;
    }
    let requestConfig = {};
    if (postConfig?.config) {
      requestConfig = {
        ...postConfig.config
      };
    }
    return this._axiosClient.post(url, body, requestConfig);
  }
  get(url, config) {
    const requestConfig = {
      ...config
    };
    return this._axiosClient.get(url, requestConfig);
  }
};
var rClient = new RClient();
export {
  RClient,
  rClient
};
