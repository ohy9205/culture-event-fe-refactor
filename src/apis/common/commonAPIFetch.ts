import { APIResponse } from "@/src/types/APIResponse";

type Method = "GET" | "POST" | "DELETE" | "PATCH";

export const authorizedAPIFetch = async (
  url: string,
  method: Method,
  body?: Record<string, any>
): Promise<APIResponse> => {
  const fetchOptions = makeFetchOption(
    method,
    { "Content-Type": "application/json" },
    "include",
    body,
    { revalidate: 36000 }
  );
  const data = await fetching(url, fetchOptions);
  return data;
};

export const authorizedAPIFetchFromServer = async (
  url: string,
  method: Method,
  at?: string,
  rt?: string,
  body?: Record<string, any>
): Promise<APIResponse> => {
  const fetchOptions = makeFetchOption(
    method,
    { "Content-Type": "application/json", Cookie: `at=${at};rt=${rt}` },
    "include",
    body,
    { revalidate: 36000 }
  );
  const data = await fetching(url, fetchOptions);
  return data;
};

export const APIFetch = async (
  url: string,
  method: Method,
  body?: Record<string, any>
): Promise<APIResponse> => {
  const fetchOptions = makeFetchOption(
    method,
    { "Content-Type": "application/json" },
    "include",
    body,
    { revalidate: 36000 }
  );
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

  return data;
};

// fetch data 변환
const convertFetchResponse = async (rs: Response): Promise<APIResponse> => {
  const data = await rs.json();
  return {
    ...data,
    status: rs.status,
  };
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
