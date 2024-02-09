import { Signin, Signup } from "@/src/types/APIRequest";
import { API_AUTH } from "@/src/utils/data/apiUrl";
import { Fetch } from "@/src/utils/fetch/fetchAdapter";

const url = API_AUTH;

export async function postSignup(body: Signup) {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  apiFetch.setBody(body);
  const rs = await apiFetch.fetching(`${url}/signUp`);

  return rs;
}

export async function postSignin(body: Signin) {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  apiFetch.setBody(body);
  const rs = await apiFetch.fetching(`${url}/signIn`);

  return rs;
}

export async function postSignout() {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  const rs = await apiFetch.fetching(`${url}/signOut`);

  return rs;
}
