import { InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from "axios";
export interface IReqInterceptor {
    fullfilled: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig>;
    rejected: (error: any) => void;
}
export interface IResInterceptor {
    fullfilled: (config: AxiosResponse) => Promise<AxiosResponse>;
    rejected: (error: any) => void;
}
export interface RClientOption {
    config?: AxiosRequestConfig;
    interceptors?: {
        requestInterceptors: IReqInterceptor[];
        responseInterceptors: IResInterceptor[];
    };
}
export interface RPostConfig {
    body?: any;
    config: AxiosRequestConfig;
}
export declare class RClient {
    private _axiosClient;
    defaultConfig: AxiosRequestConfig;
    constructor(option?: RClientOption);
    setRequestInterceptors(interceptors: IReqInterceptor[]): void;
    setResponseInterceptors(interceptors: IResInterceptor[]): void;
    appendRequestInterceptor(interceptor: IReqInterceptor): void;
    appendResponseInterceptor(interceptor: IResInterceptor): void;
    setBaseURL(baseURL: string): void;
    setAdapter(adapter: any): void;
    post<T = any>(url: string, postConfig?: RPostConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}
export declare const rClient: RClient;
