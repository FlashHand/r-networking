interface ClientConfig {
  timeout: number,
  baseURL: string
}

interface Middleware<T> {
  fullfilled?: (response: T) => T,
  rejected?: (response: T) => Promise<any>
}

declare class BasicClient {
  startMiddlewares: Middleware<any>[];
  slotMiddlewares: Middleware<any>[];
  endMiddlewares: Middleware<any>[];

  constructor(config?: ClientConfig);
}

export default BasicClient
