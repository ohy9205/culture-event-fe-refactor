"use client";

import { MyLikesState } from "@/src/entities/user";
import { ZustandStore } from "@/src/shared/store";

type Props = {
  children: React.ReactNode;
  initialValue?: MyLikesState;
};

export const myLikesStore = new ZustandStore<MyLikesState>({
  myLikes: [],
});

const MyLikesProvider = ({ children, initialValue }: Props) => {
  return (
    <myLikesStore.StoreProvider initialState={initialValue}>
      {children}
    </myLikesStore.StoreProvider>
  );
};

export default MyLikesProvider;
