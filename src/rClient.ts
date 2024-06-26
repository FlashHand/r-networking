import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig} from "axios";
export interface IReqInterceptor {
  fullfilled: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig>
  rejected: (error: any) => void
}
export interface IResInterceptor {
  fullfilled: (config: AxiosResponse) => Promise<AxiosResponse>
  rejected: (error: any) => void
}
interface IClientOption{
  config: AxiosRequestConfig;
  interceptors:{
    requestInterceptors: IReqInterceptor[];
    responseInterceptors: IResInterceptor[];

  }
}

interface IPostConfig{
  body?:any
  config:AxiosRequestConfig
}
export class RClient{
  private _axiosClient: AxiosInstance
  defaultConfig: AxiosRequestConfig = {
    timeout: 20000,
    headers: { 'Content-Type': 'application/json' }
  }
  constructor(option?:IClientOption) {
    if (option){
      this.defaultConfig = Object.assign(this.defaultConfig, option.config);
      this._axiosClient = axios.create(this.defaultConfig);
      option.interceptors.requestInterceptors.forEach((interceptor) => {
        this._axiosClient.interceptors.request.use(
          interceptor.fullfilled,
          interceptor.rejected
        )
      })
      option.interceptors.responseInterceptors.forEach((interceptor) => {
        this._axiosClient.interceptors.response.use(
          interceptor.fullfilled,
          interceptor.rejected
        )
      })
    }else {
      this._axiosClient = axios.create(this.defaultConfig);
    }
  }
  setRequestInterceptors(interceptors:IReqInterceptor[]){
    this._axiosClient.interceptors.request.clear();
    interceptors.forEach((interceptor) => {
      this._axiosClient.interceptors.request.use(
        interceptor.fullfilled,
        interceptor.rejected
      )
    })
  }
  setResponseInterceptors(interceptors:IResInterceptor[]){
    this._axiosClient.interceptors.response.clear();
    interceptors.forEach((interceptor) => {
      this._axiosClient.interceptors.response.use(
        interceptor.fullfilled,
        interceptor.rejected
      )
    })
  }

  appendRequestInterceptor(interceptor: IReqInterceptor) {
    this._axiosClient.interceptors.request.use(interceptor.fullfilled, interceptor.rejected)
  }

  appendResponseInterceptor(interceptor: IResInterceptor) {
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

  post(url:string,postConfig:IPostConfig){
    const requestConfig = {
      ...postConfig.config
    };
    return this._axiosClient.post(url,postConfig.body,requestConfig)
  }

  get(url:string,config:AxiosRequestConfig){
    return this._axiosClient.get(url,config)
  }
}