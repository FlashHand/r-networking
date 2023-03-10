interface MWClass {
	mws: [any];

	set(injectedMWs: [any]): void

	concat(middlewares: [any]): void
}

export interface ClientConfig {
	timeout?: number;
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
	withCredentials?: boolean;
	headers?: any;
}

interface ApiOptions {
	/**
	 * 为具体的api设置超时时间
	 */
	timeout?: number
}

interface ResType<T> {
	success: boolean;
	code: number;
	msg: string;
	data: T | any;
}

// export interface ResItf<T> {
// 	success: boolean;
// 	code: number;
// 	msg: string;
// 	data: T;
// }
interface MWSlotsManager {
	req_pre: MWClass;
	res_pre: MWClass;
	req_sub: MWClass;
	res_sub: MWClass;
}

// [config={isRaw:false,service:""}] http client 的配置
// * @param {boolean} [config.isRaw=false] 是否直接返回AxiosResponse实例
// * @param {string} [config.service=""]
declare class AuthClient {
	constructor(config: ClientConfig, request_mws: [any?], response_mws: [any?]);

	static mw_slots_manager: MWSlotsManager;

	createPostJSON(url: string, params: any, options?: ApiOptions): Promise<any>;

	createGet(url: string, params: any, options?: ApiOptions): Promise<any>;

	createPost(url: string, params?: any): Promise<any>;

}

declare module 'r-networking' {

	export class MWClass {
		mws: [any];

		constructor();

		set(injectedMWs: [any]): void

		concat(middlewares: [any]): void
	}

	export class MWSlotsManager {
		req_pre: MWClass;
		res_pre: MWClass;
		req_sub: MWClass;
		res_sub: MWClass;

		constructor()

	}

	export namespace client {
		const createPostJSON: (url: string, params?: any, options?: ApiOptions) => Promise<any>;

		const createGet: (url: string, params?: any, options?: ApiOptions) => Promise<any>;

		const createPost: (url: string, params?: any) => Promise<any>;
		const setBaseURL: (url: string) => void;

	}
	export namespace service_providers {
		const user_auth_wild: AuthClient
	}

	export class RysClient {
		constructor(config: ClientConfig, request_mws: [any?], response_mws: [any?]);

		static mw_slots_manager: MWSlotsManager;

		createPostJSON(url: string, params: any, options?: ApiOptions): Promise<any>;

		createGet(url: string, params: any, options?: ApiOptions): Promise<any>;

		createPost(url: string, params?: any): Promise<any>;

		setBaseURL(url: string): void


	}

	export class BasicClient {
		constructor(config: ClientConfig, request_mws: [any?], response_mws: [any?]);

		createPostJSON(url: string, params?: any, options?: ApiOptions): Promise<any>;

		createPost(url: string, params?: any): Promise<any>;

		createPostBlob(url: string, params?: any): Promise<any>;

		createGet(url: string, params?: any, options?: ApiOptions): Promise<any>;

		setBaseURL(url: string): void
	}

	export function setAdapter(adapter: any): void;

	export interface ResItf<T> {
		success: boolean;
		code: number;
		msg: string;
		data: T;
	}
}
