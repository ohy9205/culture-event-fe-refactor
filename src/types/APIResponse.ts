export type APIResponse = {
  status: number;
} & ResponseBody;

export type ResponseBody = {
  result: "success" | "fail";
  message: string;
  payload: any;
};
