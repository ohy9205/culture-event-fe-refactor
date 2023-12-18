"use client";

import { useAuthContext } from "@/src/context/AuthContext";
import Link from "next/link";
import useUser from "../../../hooks/useUser";

const AuthLinks = () => {
  const { loggedOut, isLoading } = useUser();
  const { state } = useAuthContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {state.isLoggedIn ? (
        // 로그인 상태
        <Link href="/my-page">마이 페이지</Link>
      ) : (
        // 로그아웃 상태
        <div className="flex gap-5">
          <Link href="/signin">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </div>
      )}
    </>
  );
};

export default AuthLinks;
