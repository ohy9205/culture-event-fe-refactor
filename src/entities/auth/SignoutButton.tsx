"use client";

import useAuth from "@/src/hooks/useAuth";
import Button from "../UI/common/Button";

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
