import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMyComments, getMyLikes } from "../apis/user/user";
import { FavoriteEvent, MyComment } from "../types/user";
import useUser from "./useUser";

const useMyInfo = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const { mutate, loggedOut, user, isLoading } = useUser();
  const [myFavoriteEvents, setMyFavoriteEvents] = useState<FavoriteEvent[]>([]);
  const [myComments, setMyComments] = useState<MyComment[]>([]);
  const router = useRouter();

  const responseHandler = (status: number) => {
    if (status !== 200) {
      router.push(`/error/${status}`);
    }
  };

  useEffect(() => {
    if (!isLoading && loggedOut) {
      router.push("/");
    } else {
      setNickname(user.nick);
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    const likesFetch = async () => {
      const data = await getMyLikes();

      if (data) {
        responseHandler(data.status);
        setMyFavoriteEvents(data.payload.data);
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
    console.log(user);
    localStorage.removeItem("at");
    mutate();
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
