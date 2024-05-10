import {
  APIResponse,
  AddCommentPayload,
  DeleteCommentPayload,
  PatchCommentPayload,
} from "@/src/shared/types/APIResponse";
import { API_COMMENT } from "@/src/utils/data/apiUrl";
import Fetch from "@/src/utils/fetch/Fetch";

const url = API_COMMENT;

// 코멘트 추가
export const addComment = async (
  content: string,
  eventId: number
): Promise<APIResponse<AddCommentPayload>> => {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  apiFetch.setBody({ eventId, content });
  const rs = await apiFetch.fetching<AddCommentPayload>(url);

  return rs;
};

// 코멘트 제거
export const deleteComment = async (
  commentId: number
): Promise<APIResponse<DeleteCommentPayload>> => {
  const apiFetch = new Fetch();
  apiFetch.setMethod("DELETE");
  const rs = await apiFetch.fetching<DeleteCommentPayload>(
    `${url}/${commentId}`
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
    `${url}/${commentId}`
  );

  return rs;
};
