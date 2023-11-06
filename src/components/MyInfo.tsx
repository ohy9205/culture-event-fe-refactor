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

      console.log("myInfo", myInfo);
    };
    getMyInfo();
  }, []);

  return <div>Hello</div>;
};

export default MyInfo;
