"use client";

import useMyLikes from "../hooks/useMyLikes";
import { MyFavoriteEvent } from "../types/user";

type Props = {
  children: React.ReactNode;
  likesEvent: MyFavoriteEvent[] | [];
};

export const MyLikesProvider = ({ children, likesEvent }: Props) => {
  const { Provider } = useMyLikes();

  return <Provider initialState={{ likes: likesEvent }}>{children}</Provider>;
};
