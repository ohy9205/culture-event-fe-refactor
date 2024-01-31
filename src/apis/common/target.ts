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

/**!인터페이스 구현을 어떻게 할것인가
 * 1. api호출용(데이터패칭)만 만든다
 * 나는 토큰 전달 방법에 따른 어댑터를 만드는거라서 이정도면 될듯
 *
 *
 */
