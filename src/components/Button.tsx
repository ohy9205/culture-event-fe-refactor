"use client";

import { MouseEventHandler } from "react";

type Props = {
  children: React.ReactNode;
  color?: ButtonColor;
  onClick?: MouseEventHandler;
};

type ButtonColor = "dark" | "light" | "normal";

const Button = ({ children, color = "dark", onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${colorStyle(color)} px-7 py-4 rounded-md`}
    >
      {children}
    </button>
  );
};

export default Button;

const colorStyle = (color: ButtonColor) => {
  if (color === "dark") {
    return "bg-slate-900 text-white";
  } else if (color === "light") {
    return "bg-slate-200";
  } else {
    return "bg-slate-500 text-white";
  }
};
