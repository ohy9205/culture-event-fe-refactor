import { getUserMe } from "@/src/apis/user/user";
import SignoutButton from "@/src/components/auth/SignoutButton";
import MyLikes from "@/src/components/user/MyLikes";
import { Cookie } from "@/src/utils/store/cookieAdapter";
import { Token } from "@/src/utils/token/token";

const token = new Token(new Cookie()).allToken;

const MyPage = async () => {
  const user = (await getUserMe(token)).payload.user;

  return (
    <>
      <div className="flex flex-col max-w-[900px] overflow-x-scroll w-full items-center gap-10 mt-[100px]">
        <div className="flex gap-4">
          <div className="flex flex-col gap-4 justify-center">
            <span className="flex justify-start">email: {user?.email}</span>
            <span>nickname: {user?.nick}</span>
          </div>
        </div>
        <SignoutButton />
        <hr className="w-full border-slate-400" />
        <div className="border p-2 rounded-lg bg-blue-500 text-white">
          내가 좋아하는 이벤트
        </div>
        <div className="flex gap-4 overflow-x-scroll w-full">
          <MyLikes />
        </div>
        {/* <div className="border p-2 rounded-lg bg-green-500 text-white">
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
          })} */}
      </div>
    </>
  );
};

export default MyPage;
