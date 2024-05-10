import { APIResponse } from "@/src/shared/types/APIResponse";
import { objectToQueryString } from "@/src/utils/common/objectController";
import FetchAdapter from "./FetchAdapter";

class Fetch implements FetchAdapter {
  private fetchOptions: RequestInit;

  // fetch 초기설정
  constructor(cookie?: Record<string, any>) {
    this.fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie ? objectToQueryString(cookie, ";") : "",
      },
      credentials: "include",
    };
  }

  // fetch method 옵션 설정
  setMethod(method: string): void {
    this.fetchOptions.method = method;
  }

  // fetch body 옵션 설정
  setBody(body: Record<string, any>): void {
    this.fetchOptions.body = JSON.stringify(body);
  }

  // fetch credential 옵션 설정
  setCredentials(credentials: RequestCredentials): void {
    this.fetchOptions.credentials = credentials;
  }

  // fetch cookie 옵션 설정
  setCookie(cookie: Record<string, any>): void {
    this.fetchOptions.headers = {
      ...this.fetchOptions.headers,
      Cookie: objectToQueryString(cookie, ";"),
    };
  }

  // fetch cache 옵션 설정
  setCache(cache: RequestCache): void {
    this.fetchOptions.cache = cache;
  }

  // fetch next-revalidate 옵션 설정
  setRevalidate(revalidate: number | false | undefined): void {
    this.fetchOptions.next = {
      ...this.fetchOptions.next,
      revalidate,
    };
  }

  // fetch함수 실행
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

export default Fetch;
