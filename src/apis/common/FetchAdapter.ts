import { APIResponse } from "@/src/types/APIResponse";
import { objectToQueryString } from "@/src/utils/objectController/objectController";
import { APIAdapter } from "./target";

export class FetchAdapter implements APIAdapter {
  private fetchOptions: RequestInit;

  constructor(revalidate?: number | false | undefined) {
    this.fetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: null,
      next: {
        revalidate: 36000,
      },
    };
  }

  setMethod(method: string): void {
    this.fetchOptions.method = method;
  }

  setBody(body: Record<string, any>): void {
    this.fetchOptions.body = JSON.stringify(body);
  }

  setCredentials(credentials: RequestCredentials): void {
    this.fetchOptions.credentials = credentials;
  }

  setCookie(cookie: Record<string, any>): void {
    this.fetchOptions.headers = {
      ...this.fetchOptions.headers,
      Cookie: objectToQueryString(cookie, ";"),
    };
  }

  setCache(cache: RequestCache): void {
    this.fetchOptions.cache = cache;
  }

  setRevalidate(revalidate: number | false | undefined): void {
    this.fetchOptions.next = {
      ...this.fetchOptions.next,
      revalidate,
    };
  }

  async fetching(url: string): Promise<APIResponse> {
    const rs = await fetch(url, this.fetchOptions);
    const data = await convertFetchResponse(rs);

    return data;
  }
}

const convertFetchResponse = async (rs: Response): Promise<APIResponse> => {
  const data = await rs.json();
  return {
    ...data,
    status: rs.status,
  };
};
