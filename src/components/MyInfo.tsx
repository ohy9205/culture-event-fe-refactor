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

      console.log("myInfo", myInfo);
      if (myInfo.code === 403) {
        // access token 만료
        const refreshToken = await getRefreshToken(token);
        console.log("refreshToken", refreshToken);
        await getMyInfo();
      }
    };
    getMyInfo();
  }, []);

  return <div>Hello</div>;
};

export default MyInfo;
