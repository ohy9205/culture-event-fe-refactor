import { API_AUTH } from "@/src/utils/data/APIUrl";
import { Fetch } from "@/src/utils/fetch/fetchAdapter";

const url = API_AUTH;

export async function postSignup(body: Record<string, any>) {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  apiFetch.setBody(body);
  const rs = await apiFetch.fetching(`${url}/signUp`);

  return rs;
}

// 로그인
export async function postSignin(body: Record<string, any>) {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  apiFetch.setBody(body);
  const rs = await apiFetch.fetching(`${url}/signIn`);

  return rs;
}

export async function signout() {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  const rs = await apiFetch.fetching(`${url}/signOut`);

  return rs;
}
