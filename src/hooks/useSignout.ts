import { useRouter } from "next/navigation";
import { APIResponse } from "../types/APIResponse";
import { useAuth } from "./useAuth";

const useSignout = () => {
  const router = useRouter();
  const { signout } = useAuth();

  return {
    signout: () =>
      signout({
        success: (rs: APIResponse) => router.push("/"),
      }),
  };
};

export default useSignout;
