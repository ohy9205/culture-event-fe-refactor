"use client";

import { MyLikesState, useMyLikes } from "@/src/entities/user";

type Props = {
  children: React.ReactNode;
  initialValue?: MyLikesState;
};

const MyLikesProvider = ({ children, initialValue }: Props) => {
  const { Provider } = useMyLikes();

  return <Provider initialState={initialValue}>{children}</Provider>;
};

export default MyLikesProvider;
