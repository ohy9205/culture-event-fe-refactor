import { getUserMe } from "@/src/apis/user/user";
import SignoutButton from "@/src/components/auth/SignoutButton";
import MyComments from "@/src/components/user/MyComments";
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
        <div className="w-full">
          <h1>좋아하는 이벤트</h1>
          <MyLikes />
        </div>
        <div className="w-full">
          <h1>작성한 댓글</h1>
          <MyComments />
        </div>
      </div>
    </>
  );
};

export default MyPage;
