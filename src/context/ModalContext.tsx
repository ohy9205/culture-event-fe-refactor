"use client";

import { ReactNode, createContext, useState } from "react";

type Props = {
  children: ReactNode;
};

type Context = {
  data: {
    isOpen: boolean;
  };
  close: () => void;
  open: () => void;
};

export const ModalContext = createContext<Context>({
  data: { isOpen: false },
  open: () => {},
  close: () => {},
});

export const ModalContextProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ data: { isOpen }, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};
