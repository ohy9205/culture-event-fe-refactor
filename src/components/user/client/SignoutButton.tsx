"use client";

import { signout } from "@/src/apis/auth/auth";
import { responseHandler } from "@/src/apis/common/responseHandler";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import Button from "../../UI/common/Button";

const SignoutButton = () => {
  const router = useRouter();
  const { resetAuth } = useAuthContext();

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
