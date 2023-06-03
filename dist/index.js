"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BasicClient: () => BasicClient,
  rClient: () => rClient
});
module.exports = __toCommonJS(src_exports);

// src/basicClient.ts
var import_axios = __toESM(require("axios"));
var import_qs = __toESM(require("qs"));
var BasicClient = class {
  constructor(config, interceptors) {
    this.defaultConfig = {
      timeout: 2e4,
      headers: { "Content-Type": "application/json" }
    };
    this.defaultConfig = Object.assign(this.defaultConfig, config);
    this.axiosClient = import_axios.default.create(config);
    interceptors?.requestInterceptors?.forEach((interceptor) => {
      this.axiosClient.interceptors.request.use(interceptor.fullfilled, interceptor.rejected);
    });
    interceptors?.responseInterceptors?.forEach((interceptor) => {
      this.axiosClient.interceptors.response.use(interceptor.fullfilled, interceptor.rejected);
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
  async post(url, params, config) {
    const postConfig = Object.assign({}, this.defaultConfig, config);
    const res = await this.axiosClient.post(url, params, postConfig);
    return res.data;
  }
  async postForm(url, params, config) {
    const postConfig = Object.assign({}, this.defaultConfig, config);
    const res = await this.axiosClient.post(url, import_qs.default.stringify(params), postConfig);
    return res.data;
  }
  async get(url, params, config) {
    const getConfig = {
      params,
      paramsSerializer: (params2) => {
        return import_qs.default.stringify(params2, { arrayFormat: "indices" });
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BasicClient,
  rClient
});
