import { APIResponse, SignoutPayload } from "../types/APIResponse";
import { useAuth } from "./useAuth";

const useSignout = () => {
  const { signout } = useAuth();

  return {
    signout: () =>
      signout({
        success: (rs: APIResponse<SignoutPayload>) =>
          (window.location.href = "/"),
      }),
  };
};

export default useSignout;
