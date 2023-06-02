import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import qs from 'qs';
export interface IReqInterceptor {
	fullfilled: (config: AxiosRequestConfig) => Promise<AxiosRequestConfig>
	rejected: (error: any) => void
}
export interface IResInterceptor {
	fullfilled: (config: AxiosResponse) => Promise<AxiosResponse>
	rejected: (error: any) => void
}

export class BasicClient {
	private axiosClient: AxiosInstance;
	defaultConfig: AxiosRequestConfig = {
		timeout: 20000,
		headers: {'Content-Type': 'application/json'}
	}

	constructor(
		config?: AxiosRequestConfig,
		interceptors?: {
			requestInterceptors: IReqInterceptor[],
			responseInterceptors: IResInterceptor[]
	}) {
		this.defaultConfig = Object.assign(this.defaultConfig, config);
		this.axiosClient = axios.create(config);
		interceptors?.requestInterceptors?.forEach((interceptor) => {
			this.axiosClient.interceptors.request.use(interceptor.fullfilled, interceptor.rejected)
		})
		interceptors?.responseInterceptors?.forEach((interceptor) => {
			this.axiosClient.interceptors.response.use(interceptor.fullfilled, interceptor.rejected)
		})
	}

	/**
	 * 设置baseURL
	 * @param baseURL
	 */
	setBaseURL(baseURL: string) {
		this.defaultConfig.baseURL = baseURL;
		this.axiosClient.defaults.baseURL = baseURL;
	}

	/**
	 * 设置适配器
	 * @param adapter
	 */
	setAdapter(adapter: any) {
		this.defaultConfig.adapter = adapter;
		this.axiosClient.defaults.adapter = adapter;
	}
	/**
	 * 创建一个post请求函数,支持自定义AxiosRequestConfig
	 * @param url
	 * @param params
	 * @param config
	 */
	async post<P>(url: string, params: P, config?: AxiosRequestConfig) {
		const postConfig = Object.assign({}, this.defaultConfig, config);
		const res =  await this.axiosClient.post(url, params, postConfig);
		return res.data;
	}

	/**
	 * 创建一个get请求函数,支持自定义AxiosRequestConfig
	 * @param url
	 * @param params
	 * @param config
	 */
	async get<P>(url: string, params?: P, config?: AxiosRequestConfig) {
		const getConfig = {
			params,
			paramsSerializer: (params:P) => {
				return qs.stringify(params, {arrayFormat: 'indices'});
			},
		}
		const currentConfig = Object.assign(getConfig, this.defaultConfig);
		const res = await this.axiosClient.get(url, currentConfig);
		return res.data;
	}

	setRequestInterceptors(interceptor: IReqInterceptor[]) {
		interceptor.forEach((interceptor) => {
			this.axiosClient.interceptors.request.use(interceptor.fullfilled, interceptor.rejected)
		})
	}
	setResponseInterceptors(interceptor: IResInterceptor[]) {
		interceptor.forEach((interceptor) => {
			this.axiosClient.interceptors.response.use(interceptor.fullfilled, interceptor.rejected)
		})
	}

	appendRequestInterceptor(interceptor: IReqInterceptor) {
		this.axiosClient.interceptors.request.use(interceptor.fullfilled, interceptor.rejected)
	}
	appendResponseInterceptor(interceptor: IResInterceptor) {
		this.axiosClient.interceptors.response.use(interceptor.fullfilled, interceptor.rejected)
	}

}