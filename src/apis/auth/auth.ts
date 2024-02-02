import { FetchAdapter } from "../common/FetchAdapter";
import { API_AUTH } from "../common/url";

export async function postSignup(body: Record<string, any>) {
  const url = `${API_AUTH}/signUp`;

  const apiFetch = new FetchAdapter();
  apiFetch.setMethod("POST");
  apiFetch.setBody(body);
  const rs = await apiFetch.fetching(url);

  return rs;
}

// 로그인
export async function postSignin(body: Record<string, any>) {
  const url = `${API_AUTH}/signIn`;

  const apiFetch = new FetchAdapter();
  apiFetch.setMethod("POST");
  apiFetch.setBody(body);
  const rs = await apiFetch.fetching(url);

  return rs;
}

export async function signout() {
  const url = `${API_AUTH}/signOut`;

  const apiFetch = new FetchAdapter();
  apiFetch.setMethod("POST");
  const rs = await apiFetch.fetching(url);

  return rs;
}
