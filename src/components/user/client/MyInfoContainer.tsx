"use client";

import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MyInfo from "./MyInfo";

const MyInfoContainer = () => {
  const router = useRouter();
  const { state } = useAuthContext();

  useEffect(() => {
    console.log(state.isLoggedIn);
    if (!state.isLoggedIn) {
      alert("로그인이 필요한 페이지입니다.");
      router.push("/signin");
    }
  }, [state.isLoggedIn, router]);

  return <>{state.isLoggedIn && <MyInfo />}</>;
};

export default MyInfoContainer;
