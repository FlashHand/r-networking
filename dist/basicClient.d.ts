import { AxiosRequestConfig } from "axios";
export interface IInterceptor {
    fullfilled: (config: AxiosRequestConfig) => Promise<AxiosRequestConfig>;
    rejected: (error: any) => void;
}
export declare class BasicClient {
    private axiosClient;
    defaultConfig: AxiosRequestConfig;
    constructor(config?: AxiosRequestConfig, interceptors?: {
        requestInterceptors: IInterceptor[];
        responseInterceptors: IInterceptor[];
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
     * @param params
     * @param config
     */
    post<P>(url: string, params: P, config?: AxiosRequestConfig): Promise<any>;
    /**
     * 创建一个get请求函数,支持自定义AxiosRequestConfig
     * @param url
     * @param params
     * @param config
     */
    get<P>(url: string, params?: P, config?: AxiosRequestConfig): Promise<any>;
}
