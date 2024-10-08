import { InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from "axios";
export interface RReqInterceptor {
    fullfilled: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig>;
    rejected: (error: any) => void;
}
export interface RResInterceptor {
    fullfilled: (config: AxiosResponse) => Promise<AxiosResponse>;
    rejected: (error: any) => void;
}
export interface RClientOption {
    config?: AxiosRequestConfig;
    interceptors?: {
        requestInterceptors: RReqInterceptor[];
        responseInterceptors: RResInterceptor[];
    };
}
export interface RPostConfig {
    url: string;
    body?: any;
    params?: any;
    axiosRequestConfig: AxiosRequestConfig;
}
export interface RGetConfig {
    url: string;
    params?: any;
    axiosRequestConfig: AxiosRequestConfig;
}
export declare class RClient {
    private _axiosClient;
    defaultConfig: AxiosRequestConfig;
    constructor(option?: RClientOption);
    setRequestInterceptors(interceptors: RReqInterceptor[]): void;
    setResponseInterceptors(interceptors: RResInterceptor[]): void;
    appendRequestInterceptor(interceptor: RReqInterceptor): void;
    appendResponseInterceptor(interceptor: RResInterceptor): void;
    setBaseURL(baseURL: string): void;
    setAdapter(adapter: any): void;
    post<T = any>(config: RPostConfig): Promise<T>;
    get<T = any>(config: RGetConfig): Promise<T>;
}
export declare const rClient: RClient;
