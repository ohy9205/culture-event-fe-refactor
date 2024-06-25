export type APIResponse<T> = {
  status: number;
  result: "success" | "fail";
  message: string;
  payload: T;
};

export type ResponseHandler = {
  success?: (rs: APIResponse<any>) => void;
  status401?: (rs: APIResponse<any>) => void;
  status403?: (rs: APIResponse<any>) => void;
  status409?: (rs: APIResponse<any>) => void;
};
