"use client";

import { useAuth } from "@/src/hooks/useAuth";
import Link from "next/link";
import SignoutButton from "../../auth/SignoutButton";

const AuthLinks = () => {
  const {
    data: { isLoggedIn },
  } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        // 로그인 상태
        <div className="flex items-center justify-center gap-2 ">
          <Link href="/my-page">Mypage</Link> |
          <SignoutButton />
        </div>
      ) : (
        // 로그아웃 상태
        <div className="flex gap-2 text-sm">
          <Link href="/signin">로그인</Link>|
          <Link href="/signup">회원가입</Link>
        </div>
      )}
    </>
  );
};

export default AuthLinks;
