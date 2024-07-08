import { SignoutButton } from "@/src/entities/auth";
import {
  MyComment,
  MyComments,
  MyInfo,
  MyLikes,
  getMyComments,
} from "@/src/entities/user";
import { SectionHeader } from "@/src/shared/components";
import { Cookie } from "@/src/shared/store";
import { Token } from "@/src/shared/token";

const MyPage = async () => {
  const { at, rt } = new Token(new Cookie());
  const myComments = (await getMyComments({ at, rt }))?.payload
    .commentsWithEvents;

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
