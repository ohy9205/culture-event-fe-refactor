import { API_COMMENT, API_V2 } from "@/src/shared/consts";
import { Fetch } from "@/src/shared/fetch";
import { APIResponse } from "@/src/shared/types";
import { EventComment } from ".";

type EventCommentsPayload = {
  comments: EventComment[];
};

type AddCommentPayload = {
  commentId: number;
  content: string;
};

type DeleteCommentPayload = {};

type PatchCommentPayload = {
  content: string;
};

const comment_url = API_COMMENT;
const v2_url = API_V2;

// 해당 이벤트 코멘트
export const getComments = async (
  eventId: number
): Promise<APIResponse<EventCommentsPayload>> => {
  const apiFetch = new Fetch();
  const rs = await apiFetch.fetching<EventCommentsPayload>(
    `${v2_url}/${eventId}/comments`
  );

  return rs;
};

// 코멘트 추가
export const addComment = async (
  content: string,
  eventId: number
): Promise<APIResponse<AddCommentPayload>> => {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  apiFetch.setBody({ eventId, content });
  const rs = await apiFetch.fetching<AddCommentPayload>(comment_url);

  return rs;
};

// 코멘트 제거
export const deleteComment = async (
  commentId: number
): Promise<APIResponse<DeleteCommentPayload>> => {
  const apiFetch = new Fetch();
  apiFetch.setMethod("DELETE");
  const rs = await apiFetch.fetching<DeleteCommentPayload>(
    `${comment_url}/${commentId}`
  );

  return rs;
};

// 코멘트 수정
export const patchComment = async (
  content: string,
  commentId: number
): Promise<APIResponse<PatchCommentPayload>> => {
  const apiFetch = new Fetch();
  apiFetch.setMethod("PATCH");
  apiFetch.setBody({ content });
  const rs = await apiFetch.fetching<PatchCommentPayload>(
    `${comment_url}/${commentId}`
  );

  return rs;
};
