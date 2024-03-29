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
      this.axiosClient.interceptors.request.use(
        interceptor.fullfilled,
        interceptor.rejected
      );
    });
    interceptors?.responseInterceptors?.forEach((interceptor) => {
      this.axiosClient.interceptors.response.use(
        interceptor.fullfilled,
        interceptor.rejected
      );
    });
  }
  setBaseURL(baseURL) {
    this.defaultConfig.baseURL = baseURL;
    this.axiosClient.defaults.baseURL = baseURL;
  }
  setAdapter(adapter) {
    this.defaultConfig.adapter = adapter;
    this.axiosClient.defaults.adapter = adapter;
  }
  async postBody(url, body, params, config) {
    let postConfig = Object.assign({}, this.defaultConfig, config);
    if (params) {
      postConfig.params = params;
      postConfig.paramsSerializer = (params2) => {
        return qs.stringify(params2, { arrayFormat: "indices" });
      };
    }
    const res = await this.axiosClient.post(url, body, postConfig);
    return res.data;
  }
  async post(url, params, config) {
    let postConfig = Object.assign({}, this.defaultConfig, config);
    const res = await this.axiosClient.post(url, params, postConfig);
    return res.data;
  }
  async put(url, body, params, config) {
    let postConfig = Object.assign({}, this.defaultConfig, config);
    if (params) {
      postConfig.params = params;
      postConfig.paramsSerializer = (params2) => {
        return qs.stringify(params2, { arrayFormat: "indices" });
      };
    }
    const res = await this.axiosClient.put(url, body, postConfig);
    return res.data;
  }
  async delete(url, params, config) {
    const getConfig = {
      params,
      paramsSerializer: (params2) => {
        return qs.stringify(params2, { arrayFormat: "indices" });
      }
    };
    const currentConfig = Object.assign(getConfig, this.defaultConfig);
    const res = await this.axiosClient.delete(url, currentConfig);
    return res.data;
  }
  async patch(url, body, params, config) {
    let postConfig = Object.assign({}, this.defaultConfig, config);
    if (params) {
      postConfig.params = params;
      postConfig.paramsSerializer = (params2) => {
        return qs.stringify(params2, { arrayFormat: "indices" });
      };
    }
    const res = await this.axiosClient.patch(url, body, postConfig);
    return res.data;
  }
  async postForm(url, params, config) {
    const postConfig = Object.assign({}, this.defaultConfig, config);
    const res = await this.axiosClient.post(url, qs.stringify(params), postConfig);
    return res.data;
  }
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
  appendRequestInterceptor(interceptor) {
    this.axiosClient.interceptors.request.use(interceptor.fullfilled, interceptor.rejected);
  }
  appendResponseInterceptor(interceptor) {
    this.axiosClient.interceptors.response.use(interceptor.fullfilled, interceptor.rejected);
  }
  setRequestInterceptors(interceptor) {
    interceptor.forEach((interceptor2) => {
      this.axiosClient.interceptors.request.use(
        interceptor2.fullfilled,
        interceptor2.rejected
      );
    });
  }
  setResponseInterceptors(interceptor) {
    interceptor.forEach((interceptor2) => {
      this.axiosClient.interceptors.response.use(
        interceptor2.fullfilled,
        interceptor2.rejected
      );
    });
  }
};

// src/index.ts
var rClient = new BasicClient();
export {
  BasicClient,
  rClient
};
