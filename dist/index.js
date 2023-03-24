// src/basicClient.ts
import axios from "axios";
var BasicClient = class {
  constructor(config) {
    config.headers = { "Content-Type": "application/json" };
    this.axiosClient = axios.create(config);
    this.axiosClient.interceptors.response.use;
  }
  createPost(url, params, config) {
    return (params2, config2) => {
      return this.axiosClient.post(url, params2, config2);
    };
  }
};
export {
  BasicClient
};
