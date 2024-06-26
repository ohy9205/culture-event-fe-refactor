import { APIResponse } from "../types";

interface FetchAdapter {
  setMethod(method: string): void;
  setBody(body: Record<string, any>): void;
  setCredentials(credentials: string): void;
  setCookie(cookie: Record<string, any>): void;
  setRevalidate(revalidate: number | false | undefined): void;
  setCache(cache: RequestCache): void;
  fetching<T>(url: string): Promise<APIResponse<T> | undefined>;
}

export default FetchAdapter;
