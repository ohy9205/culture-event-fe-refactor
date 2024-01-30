"use client";

/*
  로그인 유무를 판단하고 페이지를 라우팅 시키는 컴포넌트
*/

import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const ProtectRouter = ({ children }: Props) => {
  const {
    state: { isLoggedIn },
  } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn !== undefined && !isLoggedIn) {
      alert("로그인이 필요한 페이지입니다.");
      router.push("/signin");
    }
  }, [isLoggedIn, router]);

  return <>{isLoggedIn && children}</>;
};

export default ProtectRouter;
