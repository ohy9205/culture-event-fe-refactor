import { FetchAdapter } from "../common/FetchAdapter";
import { API_USER } from "../common/url";

export async function getUserMe(cookie?: Record<string, any>) {
  const url = `${API_USER}/me`;

  const apiFetch = new FetchAdapter(cookie);
  const rs = await apiFetch.fetching(url);

  return rs;
}

export async function getMyLikes(cookie?: Record<string, any>) {
  const url = `${API_USER}/liked-events`;

  const apiFetch = new FetchAdapter(cookie);
  const rs = await apiFetch.fetching(url);

  return rs;
}

export async function getMyComments(cookie?: Record<string, any>) {
  const url = `${API_USER}/comments`;

  const apiFetch = new FetchAdapter(cookie);
  apiFetch.setCache("reload");
  apiFetch.setRevalidate(36000);
  const rs = await apiFetch.fetching(url);

  return rs;
}
