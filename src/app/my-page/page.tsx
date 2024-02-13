import { getMyComments, getUserMe } from "@/src/apis/user/user";
import SectionHeader from "@/src/components/UI/common/SectionHeader";
import SignoutButton from "@/src/components/auth/SignoutButton";
import MyComments from "@/src/components/user/MyComments";
import MyLikes from "@/src/components/user/MyLikes";
import { Cookie } from "@/src/utils/store/cookieAdapter";
import { Token } from "@/src/utils/token/token";

const MyPage = async () => {
  const token = new Token(new Cookie()).allToken;
  const user = (await getUserMe(token))?.payload.user;
  const myComments = (await getMyComments(token))?.payload.commentsWithEvents;

  return (
    <div className="flex flex-col max-w-[1200px] px-4 w-full items-center gap-10 my-[100px]">
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 justify-center">
          <span className="flex justify-start">email: {user?.email}</span>
          <span>nickname: {user?.nick}</span>
        </div>
      </div>
      <SignoutButton />
      <hr className="w-full border-slate-400" />
      <div className="w-full flex flex-col gap-4">
        <SectionHeader>
          <SectionHeader.Title>찜한 이벤트</SectionHeader.Title>
        </SectionHeader>
        <MyLikes />
      </div>
      <div className="w-full mt-12 flex flex-col gap-4 ">
        <SectionHeader>
          <SectionHeader.Title>작성한 댓글</SectionHeader.Title>
        </SectionHeader>
        <MyComments comments={myComments} />
      </div>
    </div>
  );
};

export default MyPage;
