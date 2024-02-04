"use client";

import { useAuth } from "@/src/hooks/useAuth";
import useMyLikes from "@/src/hooks/useMyLikes";

import { useState } from "react";

type Props = {
  eventId: number;
  children?: React.ReactNode | ((count: number | undefined) => React.ReactNode);
  background?: boolean;
};

const LikeButton = ({ eventId, children, background }: Props) => {
  const {
    state: { isLoggedIn },
  } = useAuth();
  const {
    toggleLike,
    data: { likes },
  } = useMyLikes();
  const [count, setCount] = useState<undefined | number>();

  const checkIsMyLike = (eventId: number) => {
    if (likes?.find((event) => event.id === eventId)) {
      return true;
    } else {
      return false;
    }
  };

  const toggleButton = async (eventId: number) => {
    const rs = await toggleLike(eventId);
    setCount(rs);
  };

  const toRender = typeof children === "function" ? children(count) : children;

  return (
    <>
      {isLoggedIn ? (
        <button
          className={style(background, isLoggedIn)}
          onClick={() => toggleButton(eventId)}
        >
          {checkIsMyLike(eventId) ? "❤️" : "🤍"}
        </button>
      ) : (
        <button
          className={style(background, isLoggedIn)}
          onClick={() => toggleButton(eventId)}
        >
          🤍
        </button>
      )}
      {toRender}
    </>
  );
};

export default LikeButton;

const style = (background: boolean = false, isLoggedIn: boolean) => {
  const basic = "text-md p-2";
  const bg = isLoggedIn && background ? "bg-slate-800 rounded-md" : "";
  const cursor = isLoggedIn ? "cursor-pointer" : "cursor-auto";

  return `${basic} ${bg} ${cursor}`;
};
