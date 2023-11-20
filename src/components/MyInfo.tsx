"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";

// TODO 나중에 types 폴더에 정의
type FavoriteEvent = {
  id: number;
  period: string;
  thumbnail: string;
  title: string;
};

type MyComment = {
  id: number;
  User: {
    id: number;
    email: string;
    nick: string;
  };
  Event: {
    title: string;
    eventPeriod: string;
    thumbnail: string;
  };
  eventId: number;
  commenter: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const convertKRTime = (dateTime: string): string => {
  const utcDate = new Date(dateTime);

  const krDate = utcDate.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

  return krDate;
};

const MyInfo = () => {
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
    const response = await fetch("http://localhost:3030/user/comments", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
    const data = await response.json();
    console.log("data", data);
    setMyComments(data.payload);
  };

  return (
    <div className="flex flex-col max-w-[900px] w-full items-center gap-10 mt-[100px]">
      <div className="flex gap-4">
        <div className="border rounded-full p-4 border-gray-600">
          <Image
            alt="avatar"
            src="/avatar-svgrepo-com.svg"
            width={50}
            height={50}
          />
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <span className="flex justify-start">email: {email}</span>
          <div className="flex gap-10 justify-center items-center">
            <span>nickname: {nickname}</span>
            <button className="border p-2 rounded-lg bg-blue-400 text-white">
              닉네임 변경하기
            </button>
          </div>
        </div>
      </div>
      <button
        className="border p-2 rounded-lg bg-rose-400 text-white"
        onClick={logoutHanlder}
      >
        로그아웃
      </button>
      <button
        className="border p-2 rounded-lg bg-blue-500 text-white"
        onClick={getMyFavoriteEvents}
      >
        내가 좋아하는 이벤트 가져오기
      </button>
      {myFavoriteEvents.map((event) => {
        return (
          <div key={event.id}>
            <Image
              src={event.thumbnail}
              alt={`${event.title} 포스터`}
              width={500}
              height={500}
              className="h-[370px] object-contain"
            />
            {event.period}
            {event.title}
          </div>
        );
      })}
      <button
        className="border p-2 rounded-lg bg-green-500 text-white"
        onClick={getMyComments}
      >
        내가 작성한 댓글 가져오기
      </button>
      {myComments.map((comment) => {
        const createDate = convertKRTime(comment.createdAt);
        return (
          <div
            key={comment.id}
            className="w-full border border-gray-600 flex flex-col gap-4 p-4 rounded-md"
          >
            <div className="">{createDate}</div>
            <div className="flex gap-4">
              <Image
                src={comment.Event.thumbnail}
                alt="image"
                width={50}
                height={50}
              />
              {comment.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyInfo;
