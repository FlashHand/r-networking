import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig} from "axios";

export interface RReqInterceptor {
  fullfilled: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig>
  rejected: (error: any) => void
}

export interface RResInterceptor {
  fullfilled: (config: AxiosResponse) => Promise<AxiosResponse>
  rejected: (error: any) => void
}

export interface RClientOption {
  config?: AxiosRequestConfig;
  interceptors?: {
    requestInterceptors: RReqInterceptor[];
    responseInterceptors: RResInterceptor[];

  }
}

export interface RPostConfig {
  url: string;
  body?: any;
  params?: any;//query params
  axiosRequestConfig: AxiosRequestConfig
}
export interface RGetConfig {
  url: string;
  params?: any;//query params
  axiosRequestConfig: AxiosRequestConfig
}

export class RClient {
  private _axiosClient: AxiosInstance
  defaultConfig: AxiosRequestConfig = {
    timeout: 20000,
    headers: {'Content-Type': 'application/json'}
  }

  constructor(option?: RClientOption) {
    if (option) {
      this.defaultConfig = Object.assign(this.defaultConfig, option.config);
      this._axiosClient = axios.create(this.defaultConfig);
      option.interceptors?.requestInterceptors.forEach((interceptor) => {
        this._axiosClient.interceptors.request.use(
          interceptor.fullfilled,
          interceptor.rejected
        )
      })
      option.interceptors?.responseInterceptors.forEach((interceptor) => {
        this._axiosClient.interceptors.response.use(
          interceptor.fullfilled,
          interceptor.rejected
        )
      })
    } else {
      this._axiosClient = axios.create(this.defaultConfig);
    }
  }

  setRequestInterceptors(interceptors: RReqInterceptor[]) {
    this._axiosClient.interceptors.request.clear();
    interceptors.forEach((interceptor) => {
      this._axiosClient.interceptors.request.use(
        interceptor.fullfilled,
        interceptor.rejected
      )
    })
  }

  setResponseInterceptors(interceptors: RResInterceptor[]) {
    this._axiosClient.interceptors.response.clear();
    interceptors.forEach((interceptor) => {
      this._axiosClient.interceptors.response.use(
        interceptor.fullfilled,
        interceptor.rejected
      )
    })
  }

  appendRequestInterceptor(interceptor: RReqInterceptor) {
    this._axiosClient.interceptors.request.use(interceptor.fullfilled, interceptor.rejected)
  }

  appendResponseInterceptor(interceptor: RResInterceptor) {
    this._axiosClient.interceptors.response.use(interceptor.fullfilled, interceptor.rejected)
  }

  setBaseURL(baseURL: string) {
    this.defaultConfig.baseURL = baseURL
    this._axiosClient.defaults.baseURL = baseURL
  }

  setAdapter(adapter: any) {
    this.defaultConfig.adapter = adapter
    this._axiosClient.defaults.adapter = adapter
  }

  post<T = any>(config:RPostConfig) {
    let body = null;
    if (config?.body) {
      body = config.body
    }
    let requestConfig:AxiosRequestConfig = {};
    if (config?.axiosRequestConfig) {
      requestConfig = {
        ...config.axiosRequestConfig
      };
    }
    if (config.params) {
      requestConfig.params = config.params
    }

    return this._axiosClient.post(config.url, body, requestConfig) as Promise<T>
  }

  async get<T = any>(config:RGetConfig) {
    const requestConfig: AxiosRequestConfig = {
      ...config
    };
    if (config.params) {
      requestConfig.params = config.params
    }
    const res = await this._axiosClient.get(config.url, requestConfig);
    return (res.data || null) as T;
  }
  
}

export const rClient = new RClient();