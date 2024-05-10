"use client";

import useAuth from "@/src/shared/hooks/useAuth";
import useComment from "@/src/shared/hooks/useComment";
import { Comment as CommentType } from "@/src/shared/types/events";
import Comment from "./Comment";

type Props = {
  eventId: number;
  initComments: CommentType[];
};

const EventCommentList = ({ eventId, initComments }: Props) => {
  const {
    data: { isLoggedIn, user },
  } = useAuth();
  const {
    get,
    data: { comments, isModifyMode },
    editMode,
    modify,
    remove,
    add,
  } = useComment(eventId, initComments);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-extrabold text-lg border-b-2">Comment</h1>
      <Comment>
        {comments?.map(
          ({ id, content, createdAt, updatedAt, User: commenterUser }) => (
            <li key={id} className="bg-slate-50 p-2">
              <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Comment.Writer>{commenterUser.nick}</Comment.Writer>
                  <Comment.Period createdAt={createdAt} updatedAt={updatedAt} />
                </div>

                {/* 수정 및 삭제 버튼은 수정 모드가 아닐 때만 표시 */}
                {!isModifyMode.status && commenterUser.nick === user?.nick && (
                  <div className="flex gap-2">
                    <Comment.Button
                      onClick={() => editMode.on(id, content)}
                      color="positive">
                      수정
                    </Comment.Button>
                    <Comment.Button
                      onClick={async () => {
                        await remove(id);
                        await get();
                      }}
                      color="negative">
                      삭제
                    </Comment.Button>
                  </div>
                )}
                {/* 수정모드 나가는 버튼은 수정중인 댓글에만 표시 */}
                {isModifyMode.status && isModifyMode.commentId === id && (
                  <Comment.Button
                    onClick={() => {
                      editMode.off();
                    }}
                    color="negative">
                    나가기
                  </Comment.Button>
                )}
              </header>

              {/* 수정중인 댓글 입력창 */}
              <section className="py-4">
                {isModifyMode.status && isModifyMode.commentId === id ? (
                  <Comment.Input initContent={content}>
                    {(newContent, reset) => (
                      <Comment.Button
                        onClick={async () => {
                          if (newContent === content) {
                            editMode.off();
                            return;
                          }
                          await modify(id, newContent);
                          await get();
                          reset();
                        }}
                        color="positive">
                        등록
                      </Comment.Button>
                    )}
                  </Comment.Input>
                ) : (
                  <Comment.Content>{content}</Comment.Content>
                )}
              </section>
            </li>
          )
        )}
        {/* 댓글 입력창 */}
        {isLoggedIn && (
          <Comment.Input>
            {(content, reset) => (
              <Comment.Button
                onClick={async () => {
                  await add(content);
                  await get();
                  reset();
                }}
                color="positive">
                등록
              </Comment.Button>
            )}
          </Comment.Input>
        )}
        {!isLoggedIn && <p>댓글 작성을 위해서 로그인하세요</p>}
      </Comment>
    </div>
  );
};

export default EventCommentList;
