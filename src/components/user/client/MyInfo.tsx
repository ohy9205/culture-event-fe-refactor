"use client";

import Image from "next/image";
import useMyInfo from "../../../hooks/useMyInfo";
import { convertKRTime } from "../../../utils/convertKRTime";
import ModalToggleCard from "../../UI/container/ModalToggleCard";
import EventDetail from "../../event/client/EventDetail";

const MyInfo = () => {
  const {
    user: { nickname, email },
    myComments,
    myFavoriteEvents,
    getMyFavoriteEvents,
    logoutHanlder,
  } = useMyInfo();

  return (
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
      <div
        className="border p-2 rounded-lg bg-blue-500 text-white"
        onClick={getMyFavoriteEvents}
      >
        내가 좋아하는 이벤트
      </div>
      <div className="flex gap-4 overflow-x-scroll w-full">
        {myFavoriteEvents.map((event) => {
          return (
            <ModalToggleCard
              key={event.id}
              modalContent={<EventDetail id={event.id} />}
            >
              <div key={event.id} className="w-[300px] flex-shrink-0">
                <Image
                  src={event.thumbnail}
                  alt={`${event.title} 포스터`}
                  width={300}
                  height={300}
                  className="h-[370px] object-contain"
                />
                <div className="flex flex-col gap-4">
                  <span className="text-center">{event.period}</span>
                  <span className="text-center">{event.title}</span>
                </div>
              </div>
            </ModalToggleCard>
          );
        })}
      </div>
      <div className="border p-2 rounded-lg bg-green-500 text-white">
        내가 작성한 댓글
      </div>
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
