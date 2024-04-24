import { useEffect } from "react";
import { toggleLikes } from "../apis/event/v2";
import { getMyLikes } from "../apis/user/user";
import { MyFavoriteEvent } from "../types/user";
import { responseHandler } from "../utils/common/responseHandler";
import { ContextStore } from "../utils/globalStore/ContextSotre";
import { useAuth } from "./useAuth";

type State = { likes: MyFavoriteEvent[] | [] };

const myLikesState = new ContextStore<State>({ likes: [] });

const useMyLikes = () => {
  const [state, updateState] = myLikesState.useGlobalState();

  const {
    data: { isLoggedIn },
  } = useAuth();

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
          updateState({ likes: rs.payload.data });
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
          if (state.likes?.find((event) => event.id === eventId)) {
            const newLikes = removeLike(state.likes, event);
            updateState({ likes: newLikes });
          } else {
            const newLikes = addLike(state.likes, event);
            updateState({ likes: newLikes });
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
      updateState({ likes: [] });
    } else {
      if (state.likes.length < 1) {
        fetching();
      }
    }
  }, [isLoggedIn, state.likes.length, updateState]);

  return {
    data: { likes: state.likes },
    toggleLike,
    Provider: myLikesState.StoreProvider,
  };
};

export default useMyLikes;
