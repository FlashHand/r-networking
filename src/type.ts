import { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from "axios";

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
