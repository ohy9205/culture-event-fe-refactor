"use client";

import useMyLikes from "../../shared/hooks/useMyLikes";
import { MyFavoriteEvent } from "../../shared/types/user";

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
