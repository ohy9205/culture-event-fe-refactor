import { useAuth } from "@/src/entities/auth";
import { useModal } from "@/src/entities/modal";
import { FavoriteEvent, MyLikesState } from "@/src/entities/user";
import { responseHandler } from "@/src/shared/lib";
import { ContextStore } from "@/src/shared/store";
import { toggleLikes } from "../api";

const myLikesState = new ContextStore<MyLikesState>({
  myLikes: [],
});

const useMyLikes = () => {
  const {
    data: { isLoggedIn },
  } = useAuth();
  const { open } = useModal();

  const [state, updateState] = myLikesState.useGlobalState();

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
          // state에 존재하는 아이템이면 삭제, 없는 아이템이면 추가
          if (state?.myLikes?.find((event) => event.id === eventId)) {
            const newLikes = removeLike(event, state.myLikes);
            updateState({ myLikes: newLikes });
          } else {
            const newLikes = addLike(event, state?.myLikes);
            updateState({ myLikes: newLikes });
          }
          count = eventLikesCount;
        },
      });
    }
    return count;
  };

  return {
    data: { myLikes: state?.myLikes },
    toggleLike,
    openEventDetail: open,
    Provider: myLikesState.StoreProvider,
  };
};

const addLike = (newEvent: FavoriteEvent, likes?: FavoriteEvent[]) => {
  if (!likes) {
    return [newEvent];
  } else {
    return [...likes, newEvent];
  }
};

const removeLike = (removeEvent: FavoriteEvent, likes: FavoriteEvent[]) => {
  return likes.filter((it) => it.id !== removeEvent.id);
};

export default useMyLikes;
