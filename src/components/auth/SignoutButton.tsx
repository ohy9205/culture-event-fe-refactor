"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { APIResponse } from "@/src/types/APIResponse";
import { useRouter } from "next/navigation";
import Button from "../UI/common/Button";

const SignoutButton = () => {
  const router = useRouter();
  const { signout } = useAuth();

  const onClick = () => {
    signout({
      success: (rs: APIResponse) => router.push("/"),
    });
  };

  return (
    <Button color="dark" size="sm" onClick={onClick}>
      로그아웃
    </Button>
  );
};

export default SignoutButton;
