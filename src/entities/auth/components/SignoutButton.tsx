"use client";

import useAuth from "@/src/shared/hooks/useAuth";
import { Button } from "../../UI/common";

const SignoutButton = () => {
  const { signout } = useAuth();

  return (
    <Button
      color="dark"
      size="sm"
      onClick={() =>
        signout({
          success: () => (window.location.href = "/"),
        })
      }>
      로그아웃
    </Button>
  );
};

export default SignoutButton;
