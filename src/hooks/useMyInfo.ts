import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMyComments, getMyLikes } from "../apis/user/user";
import { FavoriteEvent, MyComment } from "../types/user";
import useUser from "./useUser";

const useMyInfo = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const { mutate, user } = useUser();
  const [myFavoriteEvents, setMyFavoriteEvents] = useState<FavoriteEvent[]>([]);
  const [myComments, setMyComments] = useState<MyComment[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
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
        setMyFavoriteEvents(data);
      }
    };

    const commentsFetch = async () => {
      const data = await getMyComments();
      if (data) {
        setMyComments(data);
      }
    };

    likesFetch();
    commentsFetch();
  }, []);

  const logoutHanlder = () => {
    localStorage.removeItem("at");
    mutate(
      { email: "", nick: "" },
      {
        optimisticData: { email: "", nick: "" },
      }
    );
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
