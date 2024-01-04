import { APIResponse } from "@/src/types/APIResponse";
import { getAccessToken, setAccessToken } from "@/src/utils/accessToken";

type Method = "GET" | "POST" | "DELETE" | "PATCH";

export const authorizedAPIFetch = async (
  url: string,
  method: Method,
  body?: Record<string, any>
): Promise<APIResponse> => {
  const fetchOptions = setFetchOption(method, true, body);
  const data = await fetching(url, fetchOptions);

  return data;
};

export const APIFetch = async (
  url: string,
  method: Method,
  body?: Record<string, any>
): Promise<APIResponse> => {
  const fetchOptions = setFetchOption(method, false, body);
  const data = await fetching(url, fetchOptions);

  return data;
};

// fetch실행
const fetching = async (
  url: string,
  fetchOptions: {
    method: Method;
    headers: HeadersInit;
    credentials: RequestCredentials;
    body: string | null;
    next: NextFetchRequestConfig | undefined;
  }
) => {
  const rs = await fetch(url, fetchOptions);
  let data = await convertFetchResponse(rs);
  saveToken(data);

  return data;
};

// fetch data 변환
const convertFetchResponse = async (rs: Response): Promise<APIResponse> => {
  const data = await rs.json();
  return {
    ...data,
    body: data.body ? JSON.stringify(data.body) : null,
  };
};

// 토큰 저장
const saveToken = (data: APIResponse) => {
  if (data.payload.at) {
    setAccessToken(data.payload.at);
  }
};

// fetch옵션 설정
const setFetchOption = (
  method: Method,
  isAuthorized: boolean,
  body?: Record<string, any>
) => {
  let headers: HeadersInit = { "Content-Type": "application/json" };
  if (isAuthorized) {
    headers["Authorization"] = `Bearer ${getAccessToken()}`;
  }
  const next = { revalidate: 36000 };
  return makeFetchOption(method, headers, "include", body, next);
};

// fetch 옵션 생성
const makeFetchOption = (
  method: Method,
  headers: HeadersInit,
  credentials: RequestCredentials,
  body?: Record<string, any>,
  next?: NextFetchRequestConfig | undefined
) => {
  return {
    method,
    headers,
    credentials,
    body: body ? JSON.stringify(body) : null,
    next,
  };
};
