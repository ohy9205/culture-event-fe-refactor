import { APIFetch } from "../common/commonAPIFetch";
import { API_AUTH } from "../common/url";

export async function postSignup(body: Record<string, any>) {
  const url = `${API_AUTH}/signUp`;
  const rs = await APIFetch(url, "POST", body);

  return rs;
}

// 로그인
export async function postSignin(body: Record<string, any>) {
  const url = `${API_AUTH}/signIn`;
  const rs = await APIFetch(url, "POST", body);
  return rs;
}
