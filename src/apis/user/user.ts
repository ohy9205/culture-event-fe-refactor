import { API_USER } from "@/src/utils/data/apiUrl";
import { Fetch } from "@/src/utils/fetch/fetchAdapter";

const url = API_USER;

export async function getUserMe(cookie?: Record<string, any>) {
  const apiFetch = new Fetch(cookie);
  const rs = await apiFetch.fetching(`${url}/me`);

  return rs;
}

export async function getMyLikes(cookie?: Record<string, any>) {
  const apiFetch = new Fetch(cookie);
  const rs = await apiFetch.fetching(`${url}/liked-events`);

  return rs;
}

export async function getMyComments(cookie?: Record<string, any>) {
  const apiFetch = new Fetch(cookie);
  const rs = await apiFetch.fetching(`${url}/comments`);

  return rs;
}
