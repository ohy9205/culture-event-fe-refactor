"use client";

import useMyLikes from "../hooks/useMyLikes";
import { MyFavoriteEvent } from "../types/user";

type Props = {
  children: React.ReactNode;
  likesEvent?: MyFavoriteEvent[];
};

export const MyLikesProvider = ({ children, likesEvent }: Props) => {
  const initialState = { myLikes: likesEvent };
  const { Provider } = useMyLikes(initialState);

  return <Provider initialState={initialState}>{children}</Provider>;
};
