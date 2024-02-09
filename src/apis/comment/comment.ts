import { API_COMMENT } from "@/src/utils/data/apiUrl";
import { Fetch } from "@/src/utils/fetch/fetchAdapter";

const url = API_COMMENT;
const apiFetch = new Fetch();

// 코멘트 추가
export async function addComment(content: string, eventId: number) {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  apiFetch.setBody({ eventId, content });
  const rs = await apiFetch.fetching(url);

  return rs;
}

// 코멘트 제거
export async function deleteComment(commentId: number) {
  const apiFetch = new Fetch();
  apiFetch.setMethod("DELETE");
  const rs = await apiFetch.fetching(`${url}/${commentId}`);

  return rs;
}

// 코멘트 수정
export async function patchComment(content: string, commentId: number) {
  const apiFetch = new Fetch();
  apiFetch.setMethod("PATCH");
  apiFetch.setBody({ content });
  const rs = await apiFetch.fetching(`${url}/${commentId}`);

  return rs;
}
