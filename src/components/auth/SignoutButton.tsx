"use client";

import useSignout from "@/src/hooks/useSignout";
import Button from "../UI/common/Button";

const SignoutButton = () => {
  const { signout } = useSignout();

  return (
    <Button color="dark" size="sm" onClick={signout}>
      로그아웃
    </Button>
  );
};

export default SignoutButton;
