"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { getUserMe } from "../utils/auth";

const MyInfo = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const { mutate } = useUser();
  const router = useRouter();

  useEffect(() => {
    const getMyInfo = async () => {
      const myInfo = await getUserMe();

      if (myInfo.code === 200) {
        setNickname(myInfo.payload.nick);
        setEmail(myInfo.payload.email);
        if (myInfo.at) {
          localStorage.setItem("at", myInfo.at);
        }
      }
    };
    getMyInfo();
  }, []);

  const logoutHanlder = () => {
    localStorage.removeItem("at");
    mutate(null, {
      optimisticData: { email: "", nickname: "" },
    });
    router.push("/");
  };

  return (
    <div className="flex flex-col max-w-[900px] w-full items-center gap-10 mt-[100px]">
      <div className="flex gap-4">
        <div className="border rounded-full p-4 border-gray-600">
          <Image
            alt="avatar"
            src="/avatar-svgrepo-com.svg"
            width={50}
            height={50}
          />
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <span className="flex justify-start">email: {email}</span>
          <div className="flex gap-10 justify-center items-center">
            <span>nickname: {nickname}</span>
            <button className="border p-2 rounded-lg bg-blue-400 text-white">
              닉네임 변경하기
            </button>
          </div>
        </div>
      </div>
      <button
        className="border p-2 rounded-lg bg-rose-400 text-white"
        onClick={logoutHanlder}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyInfo;
