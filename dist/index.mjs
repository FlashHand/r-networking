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
  post(config) {
    let body = null;
    if (config?.body) {
      body = config.body;
    }
    let requestConfig = {};
    if (config?.axiosRequestConfig) {
      requestConfig = {
        ...config.axiosRequestConfig
      };
    }
    if (config.params) {
      requestConfig.params = config.params;
    }
    return this._axiosClient.post(config.url, body, requestConfig);
  }
  async get(config) {
    const requestConfig = {
      ...config
    };
    if (config.params) {
      requestConfig.params = config.params;
    }
    const res = await this._axiosClient.get(config.url, requestConfig);
    return res.data || null;
  }
};
var rClient = new RClient();
export {
  RClient,
  rClient
};
