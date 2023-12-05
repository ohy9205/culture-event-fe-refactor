export type APIResponse = {
  status: number;
} & ResponseBody;

export type ResponseBody = {
  result: "sucess" | "fail";
  message: string;
  payload: any;
};
