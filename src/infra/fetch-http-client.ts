import fetch from "node-fetch";
import { HttpResponse, IHttpClient } from "../interface/http-client";

export class FetchHttpClient implements IHttpClient {
  public get<R = any>(url: string): Promise<HttpResponse<R>> {
    return fetch(url).then((res) => ({
      statusCode: res.status,
      body: res.json() as R | undefined,
    }));
  }
}
