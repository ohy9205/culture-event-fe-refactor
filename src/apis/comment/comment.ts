import { getAccessToken } from "@/src/utils/getAccessToken";
import { API_COMMENT } from "../common/url";

// 코멘트 추가
export async function addComment(content: string, eventId: number) {
  const accessToken = getAccessToken();
  const data = { content, eventId };

  try {
    const result = fetch(`${API_COMMENT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((rs) => {
      return rs.json();
    });

    return result;
  } catch {
    console.log("에러?");
  }
}

// 코멘트 제거
export async function deleteComment(commentId: number) {
  const accessToken = getAccessToken();

  try {
    const result = fetch(`${API_COMMENT}/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    }).then((rs) => rs.json());

    return result;
  } catch {}
}

// 코멘트 수정
export async function patchComment(content: string, commentId: number) {
  const accessToken = getAccessToken();

  try {
    const result = fetch(`${API_COMMENT}/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({ content }),
    }).then((rs) => rs.json());

    return result;
  } catch {}
}
