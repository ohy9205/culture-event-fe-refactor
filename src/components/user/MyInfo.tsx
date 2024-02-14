"use client";

import { useAuth } from "@/src/hooks/useAuth";
import React from "react";

const MyInfo = () => {
  const {
    state: { user },
  } = useAuth();

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-4 justify-center">
        <span className="flex justify-start">email: {user?.email}</span>
        <span>nickname: {user?.nick}</span>
      </div>
    </div>
  );
};

export default MyInfo;
