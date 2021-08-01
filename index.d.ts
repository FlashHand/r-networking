import {AxiosAdapter} from 'axios';

interface ClientConfig {
	/**
	 * isRaw:是否直接返回AxiosResponse实例
	 */
	isRaw?: boolean;
	/**
	 * service:微服务名，用于拼入url中
	 */
	service?: string;
	/**
	 * baseURL:http+域名
	 */
	baseURL?: string;
}

interface ApiOptions {
	/**
	 * 为具体的api设置超时时间
	 */
	timeout?: number
}

interface ResType {
	success: boolean;
	code: number;
	msg: string;
	data: any;
}

// [config={isRaw:false,service:""}] http client 的配置
// * @param {boolean} [config.isRaw=false] 是否直接返回AxiosResponse实例
// * @param {string} [config.service=""]
declare class MWClass {
	mws: [any];

	constructor();

	set(injectedMWs: [any]): void

	concat(middlewares: [any]): void
}

declare class MWSlotsManager {
	req_pre: MWClass;
	res_pre: MWClass;
	req_sub: MWClass;
	res_sub: MWClass;

	constructor()

}

declare module 'r-networking' {
	export namespace client {
		const createGet: (url: string, params?: any, option?: any) => Promise<any>
		const createPostJSON: (url: string, params?: any, option?: any) => Promise<any>
		const createGetBlob: (url: string, params?: any) => Promise<any>
		const createPostBlob: (url: string, params?: any) => Promise<any>
		const createPost: (url: string, params?: any) => Promise<ResType>;

	}

	export class RysClient {
		constructor(config: ClientConfig, request_mws: [any], response_mws: [any]);

		static mw_slots_manager: MWSlotsManager;

		createPostJSON(url: string, params: any, options?: ApiOptions): Promise<any>;

		createGet(url: string, params: any, options?: ApiOptions): Promise<any>;

		createPost(url: string, params?: any): Promise<ResType>;

	}

	export class BasicClient {
		constructor(config: ClientConfig, request_mws: [any] | [], response_mws: [any?]);

		createPostJSON(url: string, params?: any, options?: ApiOptions): Promise<ResType>;

		createPost(url: string, params?: any): Promise<ResType>;

		createGet(url: string, params?: any, options?: ApiOptions): Promise<ResType>;
	}

	export function setAdapter(adapter: any): void;

}
