"use client";

import { createContext, useContext, useState } from "react";
import { responseHandler } from "../apis/common/responseHandler";
import { getMyLikes } from "../apis/user/user";
import { FavoriteEvent } from "../types/user";

type Props = {
  children: React.ReactNode;
  likesEvent: FavoriteEvent[];
};

type InitialValue = {
  state: {
    likes?: FavoriteEvent[];
  };
  addLike: (likes: FavoriteEvent) => void;
  removeLike: (likes: FavoriteEvent) => void;
  fetching: () => void;
};

const initialValue = {
  state: {
    likes: [],
  },
  addLike: (likes: FavoriteEvent) => {},
  removeLike: (likes: FavoriteEvent) => {},
  fetching: async () => {},
};

const LikesContext = createContext<InitialValue>(initialValue);

export const LikesContextProvider = ({ children, likesEvent }: Props) => {
  // const {} = useLikes();
  const [likesState, setLikesState] = useState<FavoriteEvent[]>(likesEvent);
  console.log(likesState);

  const addLike = (likes: FavoriteEvent) => {
    const newState = [...likesState, likes];
    setLikesState(newState);
  };

  const removeLike = (likes: FavoriteEvent) => {
    const newState = likesState.filter((it) => it.id !== likes.id);
    setLikesState(newState);
  };

  const fetching = async () => {
    console.log("fetcing");
    const rs = await getMyLikes();
    if (rs) {
      responseHandler(rs, {
        success: () => {
          setLikesState(rs.payload.data);
        },
      });
    }
    return rs;
  };

  return (
    <LikesContext.Provider
      value={{
        state: {
          likes: likesState,
        },
        addLike,
        removeLike,
        fetching,
      }}
    >
      {children}
    </LikesContext.Provider>
  );
};

export const useLikesContext = () => {
  return useContext(LikesContext);
};
