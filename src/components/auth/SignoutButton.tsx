"use client";

import { signout } from "@/src/apis/auth/auth";
import { useAuth } from "@/src/hooks/useAuth";
import { responseHandler } from "@/src/utils/common/responseHandler";
import { useRouter } from "next/navigation";
import Button from "../UI/common/Button";

const SignoutButton = () => {
  const router = useRouter();
  const { resetAuth } = useAuth();

  const signoutHandler = async () => {
    const rs = await signout();
    if (rs) {
      responseHandler(rs, {
        success: () => {
          resetAuth();
          router.push("/");
        },
      });
    }
  };

  return (
    <Button color="dark" size="sm" onClick={signoutHandler}>
      로그아웃
    </Button>
  );
};

export default SignoutButton;
