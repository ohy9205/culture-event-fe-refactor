import { User } from "@/src/entities/user";
import { API_AUTH } from "@/src/shared/consts";
import { Fetch } from "@/src/shared/fetch";
import { APIResponse } from "@/src/shared/types";
import { Signin, Signup } from "./types";

export type SigninPayload = User;

export type SignupPayload = {
  email: string;
};

export type SignoutPayload = {};

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
