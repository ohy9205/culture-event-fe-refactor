import { FetchAdapter } from "../common/FetchAdapter";
import { API_COMMENT } from "../common/url";

// 코멘트 추가
export async function addComment(content: string, eventId: number) {
  const url = `${API_COMMENT}`;

  const apiFetch = new FetchAdapter();
  apiFetch.setMethod("POST");
  apiFetch.setBody({ eventId, content });
  const rs = await apiFetch.fetching(url);

  return rs;
}

// 코멘트 제거
export async function deleteComment(commentId: number) {
  const url = `${API_COMMENT}/${commentId}`;

  const apiFetch = new FetchAdapter();
  apiFetch.setMethod("DELETE");
  const rs = await apiFetch.fetching(url);

  return rs;
}

// 코멘트 수정
export async function patchComment(content: string, commentId: number) {
  const url = `${API_COMMENT}/${commentId}`;

  const apiFetch = new FetchAdapter();
  apiFetch.setMethod("PATCH");
  apiFetch.setBody({ content });
  const rs = await apiFetch.fetching(url);

  return rs;
}
