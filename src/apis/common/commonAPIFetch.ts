import { APIResponse } from "@/src/types/APIResponse";
import { getAccessToken, setAccessToken } from "@/src/utils/getAccessToken";

type Method = "GET" | "POST" | "DELETE" | "PATCH";
type FetchOption = {
  method?: Method;
  headers?: HeadersInit;
  credentials?: RequestCredentials;
  body?: Record<string, any> | null;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

// 액션
export const authorizedAPIFetch = async (
  url: string,
  method: Method,
  body?: object
): Promise<APIResponse> => {
  const at = getAccessToken(); // 액션
  const newData = await fetchData(url, setAuthFetchOption(at, method, body));

  return newData;
};

export const APIFetch = async (
  url: string,
  method: Method,
  body?: object
): Promise<APIResponse> => {
  const newData = await fetchData(url, setFetchOption(method, body));

  return newData;
};

// 액션
const fetchData = async (url: string, option: RequestInit) => {
  const rs = await fetch(url, option); // 액션
  const newData = await getResponseData(rs); // 계산
  if (newData.payload.at) {
    setAccessToken(newData.payload.at);
  }

  return newData;
};

// 계산
const getResponseData = async (rs: Response): Promise<APIResponse> => {
  const data = await rs.json();
  return {
    status: rs.status,
    ...data,
  };
};

// 계산
const setAuthFetchOption = (
  token: string | null,
  method: Method,
  body?: Record<string, any> | null
) => {
  return makeFetchOption({
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body,
    next: {
      revalidate: 3600,
    },
  });
};

// 계산
const setFetchOption = (method: Method, body?: Record<string, any> | null) => {
  return makeFetchOption({
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body,
    next: {
      revalidate: 3600,
    },
  });
};

// 계산
const makeFetchOption = (options: FetchOption) => {
  return {
    ...options,
    body: options.body ? JSON.stringify(options.body) : null,
  };
};
