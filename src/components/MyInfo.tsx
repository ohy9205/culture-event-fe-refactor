"use client";

import { useEffect, useState } from "react";
import { getUserMe } from "../utils/auth";

const MyInfo = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const getMyInfo = async () => {
      const token = localStorage.getItem("at");
      const myInfo = await getUserMe(token);

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

  return (
    <div>
      <h1>Hello {nickname}</h1>
      <h2>email: {email}</h2>
    </div>
  );
};

export default MyInfo;
