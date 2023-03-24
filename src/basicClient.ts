import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

export class BasicClient {
	private axiosClient: AxiosInstance;

	constructor(config: AxiosRequestConfig) {
		config.headers = {'Content-Type': 'application/json'};
		this.axiosClient = axios.create(config);
		this.axiosClient.interceptors.response.use
	}

	createPost<P>(url: string, params?: P&any, config?: AxiosRequestConfig) {
		return (params?: P&any, config?: AxiosRequestConfig) => {
			return this.axiosClient.post(url, params, config);
		}

	}
}