import { APIResponse } from "@/src/types/APIResponse";

const errorHandler = (rs: APIResponse) => {
  if (rs.status >= 500) {
    throw new Error(rs.message);
  }
};

// 200 or 204 && success : 정상

// 409 : 유효성검사 실패

// 403 : 권한 없음

// 404 : 없는 요청

// 401 : 토큰 없음
