import getAccessToken from "../../utils/getAccessToken";
import { API_USER } from "../common/url";

export async function getUserMe() {
  const accessToken = getAccessToken();
  if (accessToken === null) {
    const data = {
      code: 403,
      message: "access token이 없습니다",
    };
    return data;
  }
  try {
    console.log("getUserMe 실행");
    const userInfo = fetch(`${API_USER}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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

export async function getMyLikes() {
  const accessToken = getAccessToken();

  try {
    const likesList = fetch(`${API_USER}/liked-events`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      next: { revalidate: 3600 },
    })
      .then((rs) => rs.json())
      .then((data) => data.payload);

    return likesList;
  } catch {}
}

export async function getMyComments() {
  const accessToken = getAccessToken();

  try {
    const commentList = fetch(`${API_USER}/comments`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    })
      .then((rs) => rs.json())
      .then((data) => data.payload);

    return commentList;
  } catch (err) {
    console.error(err);
  }
}
