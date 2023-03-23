import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

export class BasicClient {
	private axiosClient: AxiosInstance;

	constructor(config: AxiosRequestConfig) {
		config.headers = {'Content-Type': 'application/json'};
		this.axiosClient = axios.create(config);
	}

	createPost<P>(url: string, params?: any, config?: AxiosRequestConfig) {
		return (params?: any, config?: AxiosRequestConfig) => {
			return this.axiosClient.post(url, params, config);
		}

	}
}