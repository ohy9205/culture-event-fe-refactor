"use client";

import { useAuthContext } from "@/src/context/AuthContext";
import { useMyLikes } from "@/src/hooks/useMyLikes";

import { useState } from "react";

type Props = {
  eventId: number;
  children?: React.ReactNode | ((count: number | undefined) => React.ReactNode);
  background?: boolean;
};

const Likes = ({ eventId, children, background }: Props) => {
  const {
    state: { isLoggedIn },
  } = useAuthContext();
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
          {checkIsMyLike(eventId) ? "❤️" : "🤍"}
        </button>
      )}
      {toRender}
    </>
  );
};

export default Likes;

const style = (background: boolean = false, isLoggedIn: boolean) => {
  console.log(`isLoggedIn : ${isLoggedIn}`);
  const basic = "text-lg p-2";
  const bg = background ? "bg-slate-900 rounded-md" : "";
  const cursor = isLoggedIn ? "cursor-pointer" : "cursor-auto";

  return `${basic} ${bg} ${cursor}`;
};
