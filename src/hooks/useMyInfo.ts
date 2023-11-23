import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
    getMyFavoriteEvents();
    getMyComments();
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

  const getMyFavoriteEvents = async () => {
    const accessToken = localStorage.getItem("at");
    const response = await fetch(
      "https://web-production-d139.up.railway.app/user/liked-events",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        next: { revalidate: 3600 },
      }
    );
    const data = await response.json();
    console.log("data", data);
    setMyFavoriteEvents(data.payload);
  };

  const getMyComments = async () => {
    const accessToken = localStorage.getItem("at");
    const response = await fetch(
      "https://web-production-d139.up.railway.app/user/comments",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log("data", data);
    setMyComments(data.payload);
  };

  return {
    myFavoriteEvents,
    myComments,
    logoutHanlder,
    getMyFavoriteEvents,
    user: { nickname, email },
  };
};

export default useMyInfo;
