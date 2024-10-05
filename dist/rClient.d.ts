import { InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from "axios";
export interface IReqInterceptor {
    fullfilled: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig>;
    rejected: (error: any) => void;
}
export interface IResInterceptor {
    fullfilled: (config: AxiosResponse) => Promise<AxiosResponse>;
    rejected: (error: any) => void;
}
interface IClientOption {
    config: AxiosRequestConfig;
    interceptors: {
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
    constructor(option?: IClientOption);
    setRequestInterceptors(interceptors: IReqInterceptor[]): void;
    setResponseInterceptors(interceptors: IResInterceptor[]): void;
    appendRequestInterceptor(interceptor: IReqInterceptor): void;
    appendResponseInterceptor(interceptor: IResInterceptor): void;
    setBaseURL(baseURL: string): void;
    setAdapter(adapter: any): void;
    post(url: string, postConfig: RPostConfig): Promise<AxiosResponse<any, any>>;
    get(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
}
export declare const rClient: RClient;
export {};
