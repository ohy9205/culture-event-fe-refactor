"use client";

import { createContext, useEffect, useState } from "react";
import { toggleLikes } from "../apis/event/v2";
import { getMyLikes } from "../apis/user/user";
import { useAuth } from "../hooks/useAuth";
import { MyFavoriteEvent } from "../types/user";
import { responseHandler } from "../utils/common/responseHandler";

type Props = {
  children: React.ReactNode;
  likesEvent: MyFavoriteEvent[] | [];
};

type InitialValue = {
  data: {
    likes?: MyFavoriteEvent[] | [];
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
  } = useAuth();
  const [likesState, setLikesState] = useState<MyFavoriteEvent[]>(likesEvent);

  const addLike = (likes: MyFavoriteEvent[], event: MyFavoriteEvent) => {
    return [...likes, event];
  };

  const removeLike = (likes: MyFavoriteEvent[], event: MyFavoriteEvent) => {
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
      }}>
      {children}
    </MyLikesContext.Provider>
  );
};
