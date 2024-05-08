import {
  APIResponse,
  UserCommentsPayload,
  UserInfoPayload,
  UserLikesPayload,
} from "@/src/types/APIResponse";
import { API_USER } from "@/src/utils/data/apiUrl";
import Fetch from "@/src/utils/fetch/Fetch";

const url = API_USER;

export const getUserMe = async (
  cookie?: Record<string, any>
): Promise<APIResponse<UserInfoPayload>> => {
  const apiFetch = new Fetch(cookie);
  const rs = await apiFetch.fetching<UserInfoPayload>(`${url}/me`);

  return rs;
};

export const getMyLikes = async (
  cookie?: Record<string, any>
): Promise<APIResponse<UserLikesPayload>> => {
  const apiFetch = new Fetch(cookie);
  const rs = await apiFetch.fetching<UserLikesPayload>(`${url}/liked-events`);

  return rs;
};

export const getMyComments = async (
  cookie?: Record<string, any>
): Promise<APIResponse<UserCommentsPayload>> => {
  const apiFetch = new Fetch(cookie);
  const rs = await apiFetch.fetching<UserCommentsPayload>(`${url}/comments`);

  return rs;
};
