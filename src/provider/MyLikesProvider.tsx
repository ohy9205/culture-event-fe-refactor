"use client";

import useMyLikes from "../hooks/useMyLikes";
import { MyFavoriteEvent } from "../types/user";

type Props = {
  children: React.ReactNode;
  initialValue?: MyFavoriteEvent[];
};

export const MyLikesProvider = ({ children, initialValue }: Props) => {
  const initialState = { myLikes: initialValue };
  const { Provider } = useMyLikes(initialState);

  return <Provider initialState={initialState}>{children}</Provider>;
};
