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
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  RClient: () => RClient,
  rClient: () => rClient
});
module.exports = __toCommonJS(src_exports);

// src/rClient.ts
var import_axios = __toESM(require("axios"));
var RClient = class {
  constructor(option) {
    this.defaultConfig = {
      timeout: 2e4,
      headers: { "Content-Type": "application/json" }
    };
    if (option) {
      this.defaultConfig = Object.assign(this.defaultConfig, option.config);
      this._axiosClient = import_axios.default.create(this.defaultConfig);
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
      this._axiosClient = import_axios.default.create(this.defaultConfig);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RClient,
  rClient
});
