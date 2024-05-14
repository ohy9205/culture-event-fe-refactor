import { Signin, Signup } from "@/src/shared/types/APIRequest";
import {
  APIResponse,
  SigninPayload,
  SignoutPayload,
  SignupPayload,
} from "@/src/shared/types/APIResponse";
import { API_AUTH } from "@/src/utils/data/apiUrl";
import Fetch from "@/src/utils/fetch/Fetch";

const url = API_AUTH;

export const postSignup = async (
  body: Signup
): Promise<APIResponse<SignupPayload>> => {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  apiFetch.setBody(body);
  const rs = await apiFetch.fetching<SignupPayload>(`${url}/signUp`);

  return rs;
};

export const postSignin = async (
  body: Signin
): Promise<APIResponse<SigninPayload>> => {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  apiFetch.setBody(body);
  const rs = await apiFetch.fetching<SigninPayload>(`${url}/signIn`);

  return rs;
};

export const postSignout = async (): Promise<APIResponse<SignoutPayload>> => {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  const rs = await apiFetch.fetching<SignoutPayload>(`${url}/signOut`);

  return rs;
};
