import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig} from "axios";
import qs from "qs";
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

interface IPostConfig<B,P>{
  body:B
  params:P
  config:AxiosRequestConfig

}
class RClient{
  private _axiosClient: AxiosInstance
  defaultConfig: AxiosRequestConfig = {
    timeout: 20000,
    headers: { 'Content-Type': 'application/json' }
  }
  constructor(option:IClientOption) {
    this.defaultConfig = Object.assign(this.defaultConfig, option.config);
    this._axiosClient = axios.create(option.config);
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
  post<B,P>(url:string,postConfig:IPostConfig<B,P>){
    if (postConfig.params){
      url = url + '?' + new URLSearchParams(postConfig.params).toString()
    }
    const requestConfig = {
      ...postConfig.config
    };
    return this._axiosClient.post(url,postConfig.body,{params:postConfig.params,...postConfig.config})

  }
}