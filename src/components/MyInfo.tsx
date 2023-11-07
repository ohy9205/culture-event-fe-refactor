"use client";

import { useEffect, useState } from "react";
import { getRefreshToken, getUserMe } from "../utils/auth";

const MyInfo = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const getMyInfo = async () => {
      const token = localStorage.getItem("at");
      const myInfo = await getUserMe(token);

      if (myInfo.code === 403) {
        const refreshToken = localStorage.getItem("rt");
        const getMyInfoByRT = await getRefreshToken(refreshToken);
        localStorage.setItem("at", getMyInfoByRT.at);
        // await getMyInfo();
        const newToken = getMyInfoByRT.at;
        const myInfo = await getUserMe(newToken);
        console.log("my info by New Token", myInfo);
        setNickname(myInfo.payload.nick);
        setEmail(myInfo.payload.email);
      } else {
        setNickname(myInfo.payload.nick);
        setEmail(myInfo.payload.email);
      }
    };
    getMyInfo();
  }, []);

  return (
    <div>
      <h1>Hello {nickname}</h1>
      <h2>email: {email}</h2>
    </div>
  );
};

export default MyInfo;
