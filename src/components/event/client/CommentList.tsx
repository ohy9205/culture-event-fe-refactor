"use client";

import { useAuthContext } from "@/src/context/AuthContext";
import useComment from "@/src/hooks/useComment";
import { Comment } from "@/src/types/events";
import { convertKRTime } from "@/src/utils/convertKRTime/convertKRTime";
import CommentItem from "./Comment";

type Props = {
  eventId: number;
  initComments: Comment[];
};

const CommentList = ({ eventId, initComments }: Props) => {
  const {
    state: { isLoggedIn, user },
  } = useAuthContext();
  const { get, data, editMode, modify, remove, submit, changeForm } =
    useComment(eventId, initComments);

  const renderDate = (createdAt: string, updatedAt: string) => {
    const isUpdated = createdAt === updatedAt ? false : true;
    const date = isUpdated ? updatedAt : createdAt;
    const convertedtDate = convertKRTime(date);

    return isUpdated ? `${convertedtDate} (수정)` : `${convertedtDate}`;
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-extrabold text-lg border-b-2">Comment</h1>
      <CommentItem>
        {data.comments?.map(
          ({ id, content, createdAt, updatedAt, User: commenterUser }) => (
            <li
              key={id}
              className="flex flex-col gap-5 bg-slate-50 rounded-lg p-2"
            >
              <div>
                <div className="flex justify-between items-center">
                  <CommentItem.Writer>{commenterUser.nick}</CommentItem.Writer>
                  {/* 일반모드 */}
                  {isLoggedIn && !data.isModify.status && (
                    <>
                      {commenterUser.email === user.email && (
                        <div className="flex gap-2">
                          <CommentItem.Button
                            onClick={() => editMode.on(id, content)}
                            color="positive"
                          >
                            수정
                          </CommentItem.Button>
                          <CommentItem.Button
                            onClick={async () => {
                              await remove(id);
                              await get();
                            }}
                            color="negative"
                          >
                            삭제
                          </CommentItem.Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <CommentItem.Period>
                  {renderDate(createdAt, updatedAt)}
                </CommentItem.Period>
              </div>
              {/* 댓글내용 */}
              {(!data.isModify.status || data.isModify.commentId !== id) && (
                <CommentItem.Content>{content}</CommentItem.Content>
              )}
              {/* 수정모드 */}
              {data.isModify.status && (
                <div className="flex flex-col gap-2">
                  {/* 수정중인 댓글 */}
                  {data.isModify.commentId === id && (
                    <>
                      <CommentItem.Input
                        comment={data.form.comment}
                        onChange={changeForm}
                      />
                      <div className="flex gap-2">
                        <CommentItem.Button
                          onClick={editMode.off}
                          color="positive"
                        >
                          나가기
                        </CommentItem.Button>
                        <CommentItem.Button
                          onClick={async () => {
                            await modify(id);
                            await get();
                          }}
                          color="negative"
                        >
                          수정
                        </CommentItem.Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </li>
          )
        )}
        {isLoggedIn && !data.isModify.status && (
          <li>
            <CommentItem.Input
              comment={data.form.comment}
              onChange={changeForm}
            />
            <CommentItem.Button
              color="positive"
              onClick={async () => {
                await submit();
                await get();
              }}
            >
              댓글
            </CommentItem.Button>
          </li>
        )}
        {!isLoggedIn && <li>댓글 작성을 위해서 로그인하세요.</li>}
      </CommentItem>
    </div>
  );
};

export default CommentList;
