"use client";

import { MyFavoriteEvent, useMyLikes } from "@/src/entities/user";

type Props = {
  children: React.ReactNode;
  initialValue?: MyFavoriteEvent[];
};

const MyLikesProvider = ({ children, initialValue }: Props) => {
  const initialState = initialValue ? { myLikes: initialValue } : undefined;
  const { Provider } = useMyLikes(initialState);

  return <Provider initialState={initialState}>{children}</Provider>;
};

export default MyLikesProvider;
