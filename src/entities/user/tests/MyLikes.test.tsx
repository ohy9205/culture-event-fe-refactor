import { render } from "@/src/__mocks__/lib";
import { MyLikesProvider } from "@/src/app/provider";
import { screen, waitFor } from "@testing-library/react";
import { MyLikes } from "..";
import { EventDetail } from "../../eventDetail";

const mockData = [
  {
    id: 1,
    title: "오페라 갈라",
    period: "2024-12-07~2024-12-07",
    thumbnail:
      "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=a6cb4e5a9b5b404e83454b084d88a399&thumb=Y",
  },
  {
    id: 2,
    title: "서울시합창단 송년음악회",
    period: "2024-12-05~2024-12-05",
    thumbnail:
      "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=86a744fd432e413b91b0d534bf96572f&thumb=Y",
  },
];

const openFn = jest.fn();
jest.mock("../hooks/useMyLikes", () => () => {
  const original = jest.requireActual("../hooks/useMyLikes").default;

  return {
    ...original(),
    openEventDetail: openFn,
  };
});

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2024-01-01"));
});

it("찜한 이벤트 목록이 보여진다", async () => {
  await render(
    <MyLikesProvider initialValue={{ myLikes: mockData }}>
      <MyLikes />
    </MyLikesProvider>
  );

  expect(await screen.findByText("오페라 갈라")).toBeInTheDocument();

  expect(
    await screen.findByText("서울시합창단 송년음악회")
  ).toBeInTheDocument();
});

it("찜한 이벤트가 없으면 '좋아요한 이벤트가 없습니다.' 문구가 나타난다.", async () => {
  await render(
    <MyLikesProvider initialValue={{ myLikes: [] }}>
      <MyLikes />
    </MyLikesProvider>
  );

  expect(
    await screen.findByText("좋아요한 이벤트가 없습니다.")
  ).toBeInTheDocument();
});

it("목록에서 이벤트를 클릭하면 상세정보 모달이 열린다.", async () => {
  const { user } = await render(
    <MyLikesProvider initialValue={{ myLikes: mockData }}>
      <MyLikes />
    </MyLikesProvider>
  );

  await waitFor(async () => await user.click(screen.getByText("오페라 갈라")));

  expect(openFn).toHaveBeenCalledWith(<EventDetail id={1} />);
});
