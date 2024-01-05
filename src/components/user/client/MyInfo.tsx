"use client";

import { useAuthContext } from "@/src/context/AuthContext";
import useMyComment from "@/src/hooks/useMyComment";
import useMyLikes from "@/src/hooks/useMyLikes";
import { FavoriteEvent } from "@/src/types/user";
import { removeAccessToken } from "@/src/utils/accessToken";
import Image from "next/image";
import { useEffect } from "react";
import { convertKRTime } from "../../../utils/convertKRTime";
import ModalToggleCard from "../../UI/container/ModalToggleCard";
import EventCard from "../../event/client/EventCard";
import EventDetail from "../../event/client/EventDetail";

const MyInfo = () => {
  const { state, resetAuth } = useAuthContext();
  const { data: myLikes } = useMyLikes();
  const { data: myComments, get } = useMyComment();

  // 얘는 auth관련 쪽으로 가는게 맞을거 같은데
  const logout = () => {
    removeAccessToken();
    resetAuth();
  };

  useEffect(() => {
    const fetchComments = async () => {
      await get();
    };
    fetchComments();
  }, []);

  return (
    <>
      {state.isLoggedIn && (
        <div className="flex flex-col max-w-[900px] overflow-x-scroll w-full items-center gap-10 mt-[100px]">
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
              <span className="flex justify-start">
                email: {state.user.email}
              </span>
              <div className="flex gap-10 justify-center items-center">
                <span>nickname: {state.user.nick}</span>
              </div>
            </div>
          </div>
          <button
            className="border p-2 rounded-lg bg-rose-400 text-white"
            onClick={logout}
          >
            로그아웃
          </button>
          <hr className="w-full border-slate-400" />
          <div className="border p-2 rounded-lg bg-blue-500 text-white">
            내가 좋아하는 이벤트
          </div>
          <div className="flex gap-4 overflow-x-scroll w-full px-5 py-7">
            {myLikes.events &&
              myLikes.events.map(
                ({ id, thumbnail, title, period }: FavoriteEvent) => {
                  return (
                    <ModalToggleCard
                      key={id}
                      modalContent={<EventDetail id={id} />}
                    >
                      <EventCard width="300px">
                        <EventCard.Image
                          src={thumbnail}
                          alt={`${title} 포스터`}
                          height={300}
                          width={300}
                          style="object-contain h-[300px]"
                        />
                        <div className="flex flex-col gap-2 p-5">
                          <EventCard.Title>{title}</EventCard.Title>
                          <EventCard.Period>{period}</EventCard.Period>
                        </div>
                      </EventCard>
                    </ModalToggleCard>
                  );
                }
              )}
          </div>
          <div className="border p-2 rounded-lg bg-green-500 text-white">
            내가 작성한 댓글
          </div>
          {myComments.comments &&
            myComments.comments.map((comment) => {
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
      )}
    </>
  );
};

export default MyInfo;
