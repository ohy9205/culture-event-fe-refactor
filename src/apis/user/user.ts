import { authorizedAPIFetch } from "../common/commonAPIFetch";
import { API_USER } from "../common/url";

export async function getUserMe() {
  const url = `${API_USER}/me`;
  const rs = await authorizedAPIFetch(url, "GET");

  return rs.payload.user;
}

export async function getMyLikes() {
  const url = `${API_USER}/liked-events`;
  const rs = await authorizedAPIFetch(url, "GET");

  return rs.payload.data;
}

export async function getMyComments() {
  const url = `${API_USER}/comments`;
  const rs = await authorizedAPIFetch(url, "GET");

  return rs.payload.commentsWithEvents;
}
