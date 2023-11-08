// 회원가입
type signupBody = {
  email: string;
  nick: string;
  password: string;
};

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3030"
    : "https://web-production-d139.up.railway.app";

console.log("API_URL", API_URL);

export async function postSignup(body: signupBody) {
  try {
    const signupResult = fetch(`${API_URL}/auth/signUp`, {
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

type signinBody = {
  email: string;
  password: string;
};
// 로그인
export async function postSignin(body: signinBody) {
  console.log("body", body);
  console.log("API URL", API_URL);
  try {
    const signinResult = fetch(`${API_URL}/auth/signIn`, {
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

export async function getUserMe(token: string | null) {
  if (token === null) {
    console.log("token null");
    return;
  }
  console.log("token", token);
  try {
    const userInfo = fetch(`${API_URL}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => data);
    return userInfo;
  } catch (err) {
    console.error("fetch error", err);
  }
}
