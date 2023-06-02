import { AxiosRequestConfig, AxiosResponse } from 'axios';
export interface IReqInterceptor {
    fullfilled: (config: AxiosRequestConfig) => Promise<AxiosRequestConfig>;
    rejected: (error: any) => void;
}
export interface IResInterceptor {
    fullfilled: (config: AxiosResponse) => Promise<AxiosResponse>;
    rejected: (error: any) => void;
}
export declare class BasicClient {
    private axiosClient;
    defaultConfig: AxiosRequestConfig;
    constructor(config?: AxiosRequestConfig, interceptors?: {
        requestInterceptors: IReqInterceptor[];
        responseInterceptors: IResInterceptor[];
    });
    /**
     * 设置baseURL
     * @param baseURL
     */
    setBaseURL(baseURL: string): void;
    /**
     * 设置适配器
     * @param adapter
     */
    setAdapter(adapter: any): void;
    /**
     * 创建一个post请求函数,支持自定义AxiosRequestConfig
     * @param url
     * @param body
     * @param params
     * @param config
     */
    postBody<B, P>(url: string, body: B, params?: P, config?: AxiosRequestConfig): Promise<unknown>;
    /**
     * 创建一个post请求函数,支持自定义AxiosRequestConfig
     * @param url
     * @param params
     * @param config
     */
    post<P>(url: string, params?: P, config?: AxiosRequestConfig): Promise<unknown>;
    /**
     * put,支持自定义AxiosRequestConfig
     * @param url
     * @param body
     * @param params
     * @param config
     */
    put<P>(url: string, body: P, params?: P, config?: AxiosRequestConfig): Promise<unknown>;
    /**
     * delete,支持自定义AxiosRequestConfig
     * @param url
     * @param body
     * @param params
     * @param config
     */
    delete<P>(url: string, params?: P, config?: AxiosRequestConfig): Promise<unknown>;
    /**
     * 创建一个patch请求函数,支持自定义AxiosRequestConfig
     * @param url
     * @param body
     * @param params
     * @param config
     */
    patch<P>(url: string, body: P, params?: P, config?: AxiosRequestConfig): Promise<unknown>;
    /**
     * 创建一个get请求函数,支持自定义AxiosRequestConfig
     * @param url
     * @param params
     * @param config
     */
    get<P>(url: string, params?: P, config?: AxiosRequestConfig): Promise<unknown>;
    appendRequestInterceptor(interceptor: IReqInterceptor): void;
    appendResponseInterceptor(interceptor: IResInterceptor): void;
    setRequestInterceptors(interceptor: IReqInterceptor[]): void;
    setResponseInterceptors(interceptor: IResInterceptor[]): void;
}
