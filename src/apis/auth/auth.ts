import { Signin, Signup } from "@/src/types/APIRequest";
import {
  APIResponse,
  SigninPayload,
  SignoutPayload,
  SignupPayload,
} from "@/src/types/APIResponse";
import { API_AUTH } from "@/src/utils/data/apiUrl";
import { Fetch } from "@/src/utils/fetch/fetchAdapter";

const url = API_AUTH;

export async function postSignup(
  body: Signup
): Promise<APIResponse<SignupPayload>> {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  apiFetch.setBody(body);
  const rs = await apiFetch.fetching<SignupPayload>(`${url}/signUp`);

  return rs;
}

export async function postSignin(
  body: Signin
): Promise<APIResponse<SigninPayload>> {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  apiFetch.setBody(body);
  const rs = await apiFetch.fetching<SigninPayload>(`${url}/signIn`);

  return rs;
}

export async function postSignout(): Promise<APIResponse<SignoutPayload>> {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  const rs = await apiFetch.fetching<SignoutPayload>(`${url}/signOut`);

  return rs;
}
