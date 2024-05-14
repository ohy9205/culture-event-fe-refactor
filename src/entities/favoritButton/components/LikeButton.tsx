"use client";

import useAuth from "@/src/shared/hooks/useAuth";
import useLikeToggle from "@/src/shared/hooks/useLikeToggle";

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
      {isLoggedIn ? (
        <button
          className={style(background, isLoggedIn)}
          onClick={() => toggleButton(eventId)}>
          {checkIsMyLike(eventId) ? "❤️" : "🤍"}
        </button>
      ) : (
        <button
          className={style(background, isLoggedIn)}
          onClick={() => toggleButton(eventId)}>
          🤍
        </button>
      )}
      {toRender}
    </>
  );
};

const style = (background: boolean = false, isLoggedIn: boolean) => {
  const basic = "text-md";
  const bg = background ? "bg-slate-800 rounded-md p-2" : "";
  const cursor = isLoggedIn ? "cursor-pointer" : "cursor-auto";

  return `${basic} ${bg} ${cursor}`;
};

export default LikeButton;
