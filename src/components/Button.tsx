"use client";

import { MouseEventHandler } from "react";

type Props = {
  children: React.ReactNode;
  color?: ButtonColor;
  size?: ButtonSize;
  onClick?: MouseEventHandler;
};

type ButtonColor = "dark" | "light" | "normal";
type ButtonSize = "sm" | "md" | "lg";

const Button = ({ children, color = "dark", size = "lg", onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${colorStyle(color)} ${sizeStyle(size)} rounded-md`}
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
    return "bg-slate-200 ";
  } else {
    return "bg-slate-500 text-white";
  }
};

const sizeStyle = (size: ButtonSize) => {
  if (size === "sm") {
    return "px-2 py-2 text-xs";
  } else if (size === "md") {
    return "px-5 py-2 text-sm ";
  } else if (size === "lg") {
    return "px-7 py-4 text-lg ";
  }
};
