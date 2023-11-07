// 회원가입
type signupBody = {
  email: string;
  nick: string;
  password: string;
};

export async function postSignup(body: signupBody) {
  try {
    const signupResult = fetch("http://localhost:3030/auth/signUp", {
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
  try {
    const signinResult = fetch("http://localhost:3030/auth/signIn", {
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
    const userInfo = fetch("http://localhost:3030/user/me", {
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

export async function getRefreshToken(token: string | null) {
  if (token === null) {
    console.log("token null");
    return;
  }
  try {
    const refreshToken = fetch("http://localhost:3030/auth/token/refresh", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => data);
    return refreshToken;
  } catch (err) {
    console.error(err);
  }
}
