declare class MWClass {
	mws: [any];
	constructor();
	set(injectedMWs:[any]):void
	concat(middlewares:[any]):void
}
declare module 'r-networking' {
	export namespace client {
		const createGet: (url:string, params?:any, option?:any) => Promise<any>
		const createPostJSON: (url:string, params?:any, option?:any) => Promise<any>
		const createGetBlob: (url:string, params?:any) => Promise<any>
		const createPostBlob: (url:string, params?:any) => Promise<any>
	}
	export class RysClient{
		constructor(config :any, request_mws :any, response_mws :any);
		static mw_slots_manager:MWClass
	}
}
