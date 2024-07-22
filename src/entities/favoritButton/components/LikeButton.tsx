"use client";

import { useAuth } from "../../auth";
import useLikeToggle from "../hooks/useLikeToggle";

type Props = {
  eventId: number;
  children?: React.ReactNode | ((count: number | undefined) => React.ReactNode);
  background?: boolean;
};

const LikeButton = ({ eventId, children, background }: Props) => {
  const {
    data: { isLoggedIn },
  } = useAuth();
  const {
    data: { likesCount },
    checkIsMyLike,
    toggleButton,
  } = useLikeToggle();

  const toRender =
    typeof children === "function" ? children(likesCount) : children;

  return (
    <>
      <button
        className={style(background)}
        onClick={() => toggleButton(eventId)}
        disabled={isLoggedIn ? false : true}>
        {checkIsMyLike(eventId) ? "❤️" : "🤍"}
      </button>
      {toRender}
    </>
  );
};

const style = (background: boolean = false) => {
  const basic = "text-md cusor-pointer";
  const bg = background ? "bg-slate-800 rounded-md p-2" : "";

  return `${basic} ${bg}`;
};

export default LikeButton;
