import { FetchAdapter } from "../common/FetchAdapter";
import { API_USER } from "../common/url";

export async function getUserMe() {
  const url = `${API_USER}/me`;

  const apiFetch = new FetchAdapter();
  const rs = await apiFetch.fetching(url);

  return rs;
}

export async function getMyLikes() {
  const url = `${API_USER}/liked-events`;

  const apiFetch = new FetchAdapter();
  const rs = await apiFetch.fetching(url);

  return rs;
}

export async function getMyComments() {
  const url = `${API_USER}/comments`;

  const apiFetch = new FetchAdapter();
  const rs = await apiFetch.fetching(url);

  return rs;
}
