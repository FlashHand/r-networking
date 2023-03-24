import { AxiosRequestConfig } from "axios";
export declare class BasicClient {
    private axiosClient;
    constructor(config: AxiosRequestConfig);
    createPost<P>(url: string, params?: P & any, config?: AxiosRequestConfig): (params?: P & any, config?: AxiosRequestConfig) => Promise<import("axios").AxiosResponse<any, any>>;
}
