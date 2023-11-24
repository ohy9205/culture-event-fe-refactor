"use client";

import useComment from "../hooks/useComment";
import useUser from "../hooks/useUser";
import { convertKRTime } from "../utils/date";
import Button from "./common/Button";

type Props = {
  eventId: number;
};

const Comment = ({ eventId }: Props) => {
  const { user: loginUser } = useUser();
  const {
    comments,
    commentInput,
    setCommentInput,
    isModify,
    onIsModifyHandler,
    onModifyHandler,
    onRemoveHandler,
    onSubmitHandler,
  } = useComment(eventId);

  const renderDate = (createdAt: string, updatedAt: string) => {
    const isUpdated = createdAt === updatedAt ? false : true;
    const date = isUpdated ? updatedAt : createdAt;
    const convertedtDate = convertKRTime(date);

    return isUpdated ? `${convertedtDate} (수정)` : `${convertedtDate}`;
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-extrabold text-lg border-b-2">Comment</h1>
      <ul className="flex flex-col gap-3">
        {/* 댓글 목록 */}
        {comments?.map(
          ({ id, content, createdAt, updatedAt, User: commenterUser }) => (
            <li key={id} className="bg-slate-50 rounded-lg p-2">
              {/* 일반모드 */}
              {!isModify.status && (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="font-bold">{commenterUser.nick}</div>
                    <div className="text-sm">
                      {renderDate(createdAt, updatedAt)}
                    </div>
                    {/* 내가 쓴 댓글 */}
                    {commenterUser.email === loginUser?.email && (
                      <div className="flex grow gap-2 md:justify-end">
                        <Button
                          size="sm"
                          color="light"
                          onClick={() => onIsModifyHandler(true, id, content)}
                        >
                          수정
                        </Button>
                        <Button
                          size="sm"
                          color="dark"
                          onClick={() => onRemoveHandler(id)}
                        >
                          삭제
                        </Button>
                      </div>
                    )}
                  </div>
                  <div>{content}</div>
                </div>
              )}

              {/* 수정모드 */}
              {isModify.status && (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="font-bold">{commenterUser.nick}</div>
                    <div className="text-sm">
                      {renderDate(createdAt, updatedAt)}
                    </div>
                  </div>
                  {/* 수정 안하는 댓글 */}
                  {isModify.commentId !== id && <div>{content}</div>}
                  {/* 수정중인 댓글 */}
                  {isModify.commentId === id && (
                    <form onSubmit={(e) => onModifyHandler(e, id)}>
                      <textarea
                        onChange={(e) => {
                          setCommentInput(e.target.value);
                        }}
                        value={commentInput}
                        className="w-full h-[100px] border resize-none"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          color="light"
                          onClick={() => onIsModifyHandler(false, -1)}
                        >
                          나가기
                        </Button>
                        <Button size="sm" color="dark">
                          수정
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </li>
          )
        )}

        {/* 댓글 입력 폼 */}
        <li>
          {!isModify.status && (
            <form onSubmit={onSubmitHandler}>
              <textarea
                onChange={(e) => {
                  setCommentInput(e.target.value);
                }}
                value={commentInput}
                className="w-full h-[100px] border resize-none"
              ></textarea>
              <Button size="sm" color="dark">
                댓글
              </Button>
            </form>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Comment;
