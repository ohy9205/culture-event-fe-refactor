import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { responseHandler } from "../apis/common/commonAPIFetch";
import { getMyComments, getMyLikes } from "../apis/user/user";
import { useAuthContext } from "../context/AuthContext";
import { FavoriteEvent, MyComment } from "../types/user";
import useUser from "./useUser";

const useMyInfo = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const { mutate, loggedOut, user, isLoading } = useUser();
  const [myFavoriteEvents, setMyFavoriteEvents] = useState<FavoriteEvent[]>([]);
  const [myComments, setMyComments] = useState<MyComment[]>([]);
  const router = useRouter();
  const { state, initAuth } = useAuthContext();

  useEffect(() => {
    if (!state.isLoggedIn) {
      router.push("/");
    } else {
      setNickname(state.user.nick);
      setEmail(state.user.email);
    }
  }, [state]);

  useEffect(() => {
    const likesFetch = async () => {
      const rs = await getMyLikes();

      if (rs) {
        const handler = {
          success: () => setMyFavoriteEvents(rs.payload.data),
        };
        responseHandler(rs, handler);
      }
    };

    const commentsFetch = async () => {
      const data = await getMyComments();
      if (data) {
        setMyComments(data.payload.commentsWithEvents);
      }
    };

    likesFetch();
    commentsFetch();
  }, []);

  const logoutHanlder = () => {
    localStorage.removeItem("at");
    initAuth();
    router.push("/");
  };

  return {
    myFavoriteEvents,
    myComments,
    logoutHanlder,
    getMyLikes,
    user: { nickname, email },
  };
};

export default useMyInfo;
