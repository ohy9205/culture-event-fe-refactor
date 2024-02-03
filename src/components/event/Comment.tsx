"use client";

import useForm from "@/src/hooks/useForm";
import { convertKRTime } from "@/src/utils/common/convertKRTime";
import Button from "../UI/common/Button";

type Props = {
  children: React.ReactNode;
};

type PeriodProps = {
  createdAt: string;
  updatedAt: string;
};

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  color: "positive" | "negative";
};

type InputProps = {
  initContent?: string;
  children?: (comment: string, reset: () => void) => React.ReactNode;
};

type ContentProps = Props & {
  truncate?: boolean;
};

const Comment = ({ children }: Props) => {
  return <ul className="flex flex-col gap-3">{children}</ul>;
};

const CommentWriter = ({ children }: Props) => {
  return <h1 className="font-bold">{children}</h1>;
};

const CommentPeriod = ({ createdAt, updatedAt }: PeriodProps) => {
  return <div className="text-sm">{renderDate(createdAt, updatedAt)}</div>;
};

const CommentButton = ({ onClick, children, color }: ButtonProps) => {
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

const CommentContent = ({ children, truncate }: ContentProps) => {
  return <div className={truncate ? "truncate" : ""}>{children}</div>;
};

const CommentInput = ({ initContent, children }: InputProps) => {
  const {
    changeForm,
    data: { form },
    reset,
  } = useForm({ comment: initContent || "" });

  return (
    <>
      <textarea
        onChange={(e) => changeForm(e.target.name, e.target.value)}
        name="comment"
        value={form.comment}
        className="w-full h-[100px] border resize-none"
        maxLength={500}
      >
        {form.comment}
      </textarea>

      {children !== undefined && <div>{children(form.comment, reset)}</div>}
    </>
  );
};

const renderDate = (createdAt: string, updatedAt: string) => {
  const isUpdated = createdAt === updatedAt ? false : true;
  const date = isUpdated ? updatedAt : createdAt;
  const convertedtDate = convertKRTime(date);

  return isUpdated ? `${convertedtDate} (수정)` : `${convertedtDate}`;
};

export default Comment;
Comment.Writer = CommentWriter;
Comment.Period = CommentPeriod;
Comment.Content = CommentContent;
Comment.Button = CommentButton;
Comment.Input = CommentInput;
