import { APIResponse } from "@/src/types/APIResponse";

export type ResponseHandler = {
  success?: (rs: APIResponse<any>) => void;
  status401?: (rs: APIResponse<any>) => void;
  status403?: (rs: APIResponse<any>) => void;
  status409?: (rs: APIResponse<any>) => void;
};

// response handler
const responseHandler = <T>(rs: APIResponse<T>, handler: ResponseHandler) => {
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
  } else if (rs.status === 404) {
    window.location.replace(`/error/404`);
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

export default responseHandler;
