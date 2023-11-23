import { signinBody, signupBody } from "../types/auth";
import { API_AUTH } from "./common/url";

export async function postSignup(body: signupBody) {
  try {
    const signupResult = fetch(`${API_AUTH}/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => data);

    return signupResult;
  } catch (err) {
    console.error(err);
  }
}

// 로그인
export async function postSignin(body: signinBody) {
  try {
    const signinResult = fetch(`${API_AUTH}/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => data);
    return signinResult;
  } catch (err) {
    console.error(err);
  }
}
