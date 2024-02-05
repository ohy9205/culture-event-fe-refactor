import { APIResponse } from "@/src/types/APIResponse";

export type ResponseHandler = {
  success?: (rs: APIResponse) => void;
  status401?: (rs: APIResponse) => void;
  status403?: (rs: APIResponse) => void;
  status409?: (rs: APIResponse) => void;
};

// response handler
export const responseHandler = (rs: APIResponse, handler: ResponseHandler) => {
  if (rs.status === 200 || rs.status === 201) {
    if (handler.success) {
      handler.success(rs);
    }
  } else if (rs.status === 403) {
    if (handler.status403) {
      handler.status403(rs);
    } else {
      alert(rs.message);
    }
  } else if (rs.status === 409) {
    if (handler.status409) {
      handler.status409(rs);
    }
  } else if (rs.status === 401) {
    if (handler.status401) {
      handler.status401(rs);
    }
  } else {
    window.location.replace(`/error/${rs.status}`);
  }
};
