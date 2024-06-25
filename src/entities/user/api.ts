import { API_USER, API_V2 } from "@/src/shared/consts";
import { Fetch } from "@/src/shared/fetch";
import { APIResponse } from "@/src/shared/types";
import { MyComment, MyFavoriteEvent, User } from "./types";

type UserInfoPayload = {
  user: User;
};

type UserLikesPayload = {
  data: MyFavoriteEvent[];
};

type UserCommentsPayload = {
  commentsWithEvents: MyComment[];
};

export type ToggleLikesPayload = {
  action: "add" | "remove";
  event: MyFavoriteEvent;
  eventLikesCount: number;
};

const url_user = API_USER;
const url_v2 = API_V2;

export const getUserMe = async (
  cookie?: Record<string, any>
): Promise<APIResponse<UserInfoPayload>> => {
  const apiFetch = new Fetch(cookie);
  const rs = await apiFetch.fetching<UserInfoPayload>(`${url_user}/me`);

  return rs;
};

export const getMyLikes = async (
  cookie?: Record<string, any>
): Promise<APIResponse<UserLikesPayload>> => {
  const apiFetch = new Fetch(cookie);
  const rs = await apiFetch.fetching<UserLikesPayload>(
    `${url_user}/liked-events`
  );

  return rs;
};

export const getMyComments = async (
  cookie?: Record<string, any>
): Promise<APIResponse<UserCommentsPayload>> => {
  const apiFetch = new Fetch(cookie);
  const rs = await apiFetch.fetching<UserCommentsPayload>(
    `${url_user}/comments`
  );

  return rs;
};

// 좋아요 토글
export const toggleLikes = async (
  eventId: number
): Promise<APIResponse<ToggleLikesPayload>> => {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  const rs = await apiFetch.fetching<ToggleLikesPayload>(
    `${url_v2}/${eventId}/likes`
  );

  return rs;
};
