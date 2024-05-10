import { getMyComments } from "@/src/apis/user/user";
import SectionHeader from "@/src/components/UI/common/SectionHeader";
import SignoutButton from "@/src/components/auth/SignoutButton";
import MyComments from "@/src/entities/user/MyComments";
import MyInfo from "@/src/entities/user/MyInfo";
import MyLikes from "@/src/entities/user/MyLikes";
import { MyComment } from "@/src/shared/types/user";
import Cookie from "@/src/utils/localStore/Cookie";
import Token from "@/src/utils/token/Token";

const MyPage = async () => {
  const token = new Token(new Cookie()).allToken;
  const myComments = (await getMyComments(token))?.payload.commentsWithEvents;

  return (
    <div className="flex flex-col max-w-[1200px] px-4 w-full items-center gap-10 my-[100px]">
      <MyInfo />
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
        <MyComments comments={sortByCreatedAt(myComments)} />
      </div>
    </div>
  );
};

// 작성일순으로 댓글 정렬
const sortByCreatedAt = (comments: MyComment[]) => {
  return comments.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateB.getTime() - dateA.getTime(); // 날짜가 빠른 순으로 정렬
  });
};

export default MyPage;
