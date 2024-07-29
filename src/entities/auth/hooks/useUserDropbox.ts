"use client";

import { useState } from "react";

const useUserDropbox = () => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    data: { isOpen },
    toggleDropbox: () => {
      setIsOpen((prev) => !prev);
    },
  };
};

export default useUserDropbox;
