"use client";

import { MouseEventHandler } from "react";
import Button from "../../UI/common/Button";

type Props = {
  children: React.ReactNode;
};

const Comment = ({ children }: Props) => {
  return <ul className="flex flex-col gap-3">{children}</ul>;
};

const CommentWriter = ({ children }: Props) => {
  return <h1 className="font-bold">{children}</h1>;
};

const CommentPeriod = ({ children }: Props) => {
  return <div className="text-sm">{children}</div>;
};

const CommentButton = ({
  onClick,
  children,
  color,
}: {
  onClick: MouseEventHandler;
  children: React.ReactNode;
  color: "positive" | "negative";
}) => {
  return (
    <Button
      onClick={onClick}
      color={color === "positive" ? "light" : "dark"}
      size="sm"
    >
      {children}
    </Button>
  );
};

const CommentContent = ({ children }: Props) => {
  return <div>{children}</div>;
};

const CommentInput = ({
  comment,
  onChange,
}: {
  comment: string;
  onChange: (name: string, value: any) => void;
}) => {
  return (
    <textarea
      onChange={(e) => onChange(e.target.name, e.target.value)}
      name={"comment"}
      value={comment}
      className="w-full h-[100px] border resize-none"
    >
      {comment}
    </textarea>
  );
};

export default Comment;
Comment.Writer = CommentWriter;
Comment.Period = CommentPeriod;
Comment.Content = CommentContent;
Comment.Button = CommentButton;
Comment.Input = CommentInput;
