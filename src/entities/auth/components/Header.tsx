"use client";

import Link from "next/link";
import { SignoutButton } from "..";

type Props = {
  isLoggedIn: boolean;
};
const Header = ({ isLoggedIn }: Props) => {
  return (
    <header className="bg-slate-200 w-full h-[50px] flex justify-center items-center">
      <nav className="flex justify-between gap-16 flex-none">
        <h1 className="font-semibold hidden sm:block">
          <Link href={"/"}>
            <span className="text-2xl font-bold text-slate-700">서</span>울시
            <span className="text-2xl font-bold text-slate-700">행</span>사
            <span className="text-2xl font-bold text-slate-700">안</span>내
          </Link>
        </h1>
        <div className="flex gap-5 text-xl justify-center items-center max-w-[1200px]">
          <Link href={"/"}>Home</Link>
          <Link href={"/event"}>Event</Link>
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
