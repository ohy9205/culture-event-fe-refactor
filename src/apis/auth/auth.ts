import { signinBody, signupBody } from "../../types/auth";
import { APIFetch } from "../common/commonAPIFetch";
import { API_AUTH } from "../common/url";

export async function postSignup(body: signupBody) {
  const url = `${API_AUTH}/signUp`;
  const rs = await APIFetch(url, "POST", body);

  return rs;
}

// 로그인
export async function postSignin(body: signinBody) {
  const url = `${API_AUTH}/signIn`;
  const rs = await APIFetch(url, "POST", body);
  return rs;
}
