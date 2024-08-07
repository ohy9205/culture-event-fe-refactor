"use client";

import { useAuth } from "@/src/entities/auth";
import { Button } from "@/src/shared/components";

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
