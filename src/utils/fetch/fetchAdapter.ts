import { APIResponse } from "@/src/types/APIResponse";
import { objectToQueryString } from "@/src/utils/common/objectController";
import { APIAdapter } from "./adapter";

export class Fetch implements APIAdapter {
  private fetchOptions: RequestInit;

  constructor(cookie?: Record<string, any>) {
    this.fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie ? objectToQueryString(cookie, ";") : "",
      },
      credentials: "include",
      body: null,
      next: {
        revalidate: 0,
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

  async fetching<T>(url: string): Promise<APIResponse<T>> {
    try {
      const rs = await fetch(url, this.fetchOptions);
      const data = await rs.json();

      return {
        ...data,
        status: rs.status,
      };
    } catch (error) {
      return {
        result: "fail",
        status: 500,
        message: "알 수 없는 에러 발생",
        payload: {} as T,
      };
    }
  }
}

// const convertFetchResponse = async <T>(
//   rs: Response
// ): Promise<APIResponse<T>> => {
//   const data = await rs.json();
//   return {
//     ...data,
//     status: rs.status,
//   };
// };
