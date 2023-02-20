export enum HttpStatusCode {
  OK = 200,
  NOT_MODIFIED = 304,
  FORBIDDEN = 403,
  UNPROCESSABLE_ENTITY = 422,
  SERVICE_UNAVAILABLE = 503,
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};

export interface IHttpClient {
  get: <R = any>(url: string) => Promise<HttpResponse<R>>;
}
