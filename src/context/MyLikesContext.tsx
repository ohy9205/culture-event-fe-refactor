"use client";

import { createContext, useEffect, useState } from "react";
import { responseHandler } from "../apis/common/responseHandler";
import { toggleLikes } from "../apis/event/v2";
import { getMyLikes } from "../apis/user/user";
import { FavoriteEvent } from "../types/user";
import { useAuthContext } from "./AuthContext";

type Props = {
  children: React.ReactNode;
  likesEvent: FavoriteEvent[];
};

type InitialValue = {
  data: {
    likes?: FavoriteEvent[];
  };
  toggleLike: (eventId: number) => Promise<undefined | number>;
};

const initialValue = {
  data: {
    likes: [],
  },
  toggleLike: async (eventId: number) => undefined,
};

export const MyLikesContext = createContext<InitialValue>(initialValue);

export const MyLikesContextProvider = ({ children, likesEvent }: Props) => {
  const {
    state: { isLoggedIn },
  } = useAuthContext();
  const [likesState, setLikesState] = useState<FavoriteEvent[]>(likesEvent);

  const addLike = (likes: FavoriteEvent[], event: FavoriteEvent) => {
    return [...likes, event];
  };

  const removeLike = (likes: FavoriteEvent[], event: FavoriteEvent) => {
    return likes.filter((it) => it.id !== event.id);
  };

  const fetching = async () => {
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

  const toggleLike = async (eventId: number) => {
    if (!isLoggedIn) {
      return;
    }
    let count;
    const rs = await toggleLikes(eventId);
    if (rs) {
      responseHandler(rs, {
        success: () => {
          const {
            payload: { event, eventLikesCount },
          } = rs;
          if (likesState?.find((event) => event.id === eventId)) {
            const newLikes = removeLike(likesState, event);
            setLikesState(newLikes);
          } else {
            const newLikes = addLike(likesState, event);
            setLikesState(newLikes);
          }
          count = eventLikesCount;
        },
      });
    }
    return count;
  };

  // 로그아웃 시 초기화, 로그인 시 데이터패칭
  useEffect(() => {
    if (!isLoggedIn) {
      setLikesState([]);
    } else {
      if (likesState.length < 1) {
        fetching();
      }
    }
  }, [isLoggedIn, likesState?.length]);

  return (
    <MyLikesContext.Provider
      value={{
        data: {
          likes: likesState,
        },
        toggleLike,
      }}
    >
      {children}
    </MyLikesContext.Provider>
  );
};
