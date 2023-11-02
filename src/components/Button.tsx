"use client";

import { MouseEventHandler } from "react";

type Props = {
  children: React.ReactNode;
  onClick?: MouseEventHandler;
};

const Button = ({ children, onClick }: Props) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
