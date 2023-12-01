import { authorizedAPIFetch } from "../common/commonAPIFetch";
import { API_COMMENT } from "../common/url";

// 코멘트 추가
export async function addComment(content: string, eventId: number) {
  const url = `${API_COMMENT}`;
  const rs = await authorizedAPIFetch(url, "POST", { eventId, content });

  return rs.payload;
}

// 코멘트 제거
export async function deleteComment(commentId: number) {
  const url = `${API_COMMENT}/${commentId}`;
  const rs = await authorizedAPIFetch(url, "DELETE");

  return rs.payload;
}

// 코멘트 수정
export async function patchComment(content: string, commentId: number) {
  const url = `${API_COMMENT}/${commentId}`;
  const rs = await authorizedAPIFetch(url, "PATCH", { content });

  return rs.payload;
}
