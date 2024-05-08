"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CheckAuthPage = () => {
  const router = useRouter();

  useEffect(() => {
    alert("로그인이 필요한 페이지입니다.");
    router.replace("/signin");
  }, [router]);

  return <></>;
};

export default CheckAuthPage;
