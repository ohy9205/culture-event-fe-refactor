import {
  APIResponse,
  AddCommentPayload,
  DeleteCommentPayload,
  PatchCommentPayload,
} from "@/src/types/APIResponse";
import { API_COMMENT } from "@/src/utils/data/apiUrl";
import { Fetch } from "@/src/utils/fetch/fetchAdapter";

const url = API_COMMENT;

// 코멘트 추가
export async function addComment(
  content: string,
  eventId: number
): Promise<APIResponse<AddCommentPayload>> {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  apiFetch.setBody({ eventId, content });
  const rs = await apiFetch.fetching<AddCommentPayload>(url);

  return rs;
}

// 코멘트 제거
export async function deleteComment(
  commentId: number
): Promise<APIResponse<DeleteCommentPayload>> {
  const apiFetch = new Fetch();
  apiFetch.setMethod("DELETE");
  const rs = await apiFetch.fetching<DeleteCommentPayload>(
    `${url}/${commentId}`
  );

  return rs;
}

// 코멘트 수정
export async function patchComment(
  content: string,
  commentId: number
): Promise<APIResponse<PatchCommentPayload>> {
  const apiFetch = new Fetch();
  apiFetch.setMethod("PATCH");
  apiFetch.setBody({ content });
  const rs = await apiFetch.fetching<PatchCommentPayload>(
    `${url}/${commentId}`
  );

  return rs;
}
