import { APIResponse } from "@/src/types/APIResponse";
import { getAccessToken, setAccessToken } from "@/src/utils/getAccessToken";

type Method = "GET" | "POST" | "DELETE" | "PATCH";

// query는 url에 붙여서 같이 보내게 되고
// body는 넣어줘야함
export const authorizedAPIFetch = async (
  url: string,
  method: Method,
  body?: object
): Promise<APIResponse> => {
  const accessToken = getAccessToken();
  const rs = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : null,
  });

  const data = await rs.json();

  if (data.payload.at) {
    setAccessToken(data.payload.at);
  }

  return {
    status: rs.status,
    ...data,
  };
};

export const APIFetch = async (
  url: string,
  method: Method,
  body?: object
): Promise<APIResponse> => {
  const rs = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : null,
  });
  const data = await rs.json();

  if (data.payload.at) {
    setAccessToken(data.payload.at);
  }

  return {
    status: rs.status,
    ...data,
  };
};
