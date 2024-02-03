import { APIResponse } from "@/src/types/APIResponse";

export interface APIAdapter {
  setMethod(method: string): void;
  setBody(body: Record<string, any>): void;
  setCredentials(credentials: string): void;
  setCookie(cookie: Record<string, any>): void;
  setRevalidate(revalidate: number | false | undefined): void;
  setCache(cache: RequestCache): void;
  fetching(url: string): Promise<APIResponse>;
}
