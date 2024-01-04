import { APIResponse } from "@/src/types/APIResponse";

// response handler
export const responseHandler = (
  { status, message }: APIResponse,
  handler: {
    success?: () => void;
    status401?: () => void;
    status403?: () => void;
    status409?: () => void;
  }
) => {
  if (status === 200 || status === 201) {
    if (handler.success) {
      handler.success();
    }
  } else if (status === 403) {
    if (handler.status403) {
      handler.status403();
    } else {
      alert(message);
    }
  } else if (status === 409) {
    if (handler.status409) {
      handler.status409();
    }
  } else if (status === 401) {
    if (handler.status401) {
      handler.status401();
    }
  } else {
    window.location.replace(`/error/${status}`);
  }
};
