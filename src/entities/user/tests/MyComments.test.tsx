import { render } from "@/src/__mocks__/lib";
import { screen, waitFor } from "@testing-library/dom";
import { MyComments } from "..";
import { EventDetail } from "../../eventDetail";

const mockData = [
  {
    id: 58,
    content: "흠",
    createdAt: "2024-07-10T11:35:53.000Z",
    updatedAt: "2024-07-10T11:35:53.000Z",
    eventId: 4,
    commenter: 1,
    User: {
      id: 1,
      email: "test@test.com",
      nick: "yeon",
    },
    Event: {
      title: "라보엠",
      eventPeriod: "2024-11-21~2024-11-24",
      thumbnail:
        "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=ff225b0ea551476ab339105b634b3c9a&thumb=Y",
    },
  },
  {
    id: 53,
    content: "어디보장",
    createdAt: "2024-03-30T07:37:44.000Z",
    updatedAt: "2024-03-30T07:37:44.000Z",
    eventId: 257,
    commenter: 1,
    User: {
      id: 1,
      email: "test@test.com",
      nick: "yeon",
    },
    Event: {
      title: "[서울상상나라] 우리, 캠핑 가요!",
      eventPeriod: "2023-10-31~2024-12-31",
      thumbnail:
        "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=cb2af3a9757741aa996b416188cbffcf&thumb=Y",
    },
  },
];

const openFn = jest.fn();
jest.mock("../../modal/hook/useModal", () => () => ({
  open: openFn,
}));

it("로그인한 유저가 작성한 댓글 보여진다.", async () => {
  await render(<MyComments comments={mockData} />);

  expect(screen.getByText("흠")).toBeInTheDocument();

  expect(screen.getByText("어디보장")).toBeInTheDocument();
});

it("댓글을 클릭하면 해당 댓글이 달린 이벤트 상세 모달이 오픈된다.", async () => {
  const { user } = await render(<MyComments comments={mockData} />);

  await waitFor(async () => await user.click(screen.getByText("흠")));

  expect(openFn).toHaveBeenLastCalledWith(<EventDetail id={4} />);
});

it("작성한 댓글없으면 '작성한 댓글이 없습니다.' 문구가 보여진다.", async () => {
  await render(<MyComments comments={[]} />);

  expect(screen.getByText("작성한 댓글이 없습니다.")).toBeInTheDocument();
});
