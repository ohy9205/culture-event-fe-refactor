import { render } from "@/src/__mocks__/lib";
import { describe, expect, it, jest } from "@jest/globals";
import { screen } from "@testing-library/dom";
import { act } from "@testing-library/react";
import { EventDetail } from "..";

// prop으로 받은 event id에 대한 상세정보가 보여진다.
// => 이미지, 장르, 장소, 기간, 대상, 요금,
// 이벤트 위치에 대한 맵이 보여진다.
// '상세정보 보러가기'를 클릭하면 해당 이벤트 홈페이지로 링크가 연결된다.

describe("이벤트 정보", () => {
  it("prop으로 받은 evnet id에 대한 상세정보가 보여진다.", async () => {
    await render(<EventDetail id={4} />);

    const img: HTMLImageElement = await screen.findByRole("img");
    expect(img.src).toBe(
      "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=cb2af3a9757741aa996b416188cbffcf&thumb=Y"
    );

    expect(
      await screen.findByText("[서울상상나라] 우리, 캠핑 가요!")
    ).toBeInTheDocument();

    expect(await screen.findByText("전시/미술")).toBeInTheDocument();

    expect(
      await screen.findByText("서울상상나라 3층 문화놀이")
    ).toBeInTheDocument();

    expect(
      await screen.findByText("2023-10-31~2024-12-31")
    ).toBeInTheDocument();

    expect(await screen.findByText("서울상상나라 관람객")).toBeInTheDocument();

    expect(
      await screen.findByText("무료(입장권 4,000원 별도)")
    ).toBeInTheDocument();
  });

  it("'상세정보 보러가기'를 클릭하면 해당 이벤트 홈페이지로 링크가 연결된다.", async () => {
    jest.mock("next/link", () => ({ href }: { href: string }) => (
      <link href={href}></link>
    ));

    await render(<EventDetail id={4} />);

    const link = await screen.findByRole("link");
    console.log(link);
    expect(link).toHaveAttribute(
      "href",
      "https://www.seoulchildrensmuseum.org/display/displayAll.do"
    );
  });
});

describe("favorit button", () => {
  const toggleButtonFn = jest.fn();
  jest.mock("@/src/entities/favoritButton/hooks/useLikeToggle", () => ({
    toggleButton: toggleButtonFn,
  }));

  it("로그인 하지 않으면 ❤️버튼은 비활성화된다.", async () => {
    const { user } = await render(<EventDetail id={4} />);

    // 화면이 업데이트 되었는지 확인
    const button = await screen.findByRole("button", { name: "🤍" });
    await act(async () => await user.click(button));

    expect(toggleButtonFn).toHaveBeenCalledTimes(0);
    expect(
      await screen.findByRole("button", { name: "🤍" })
    ).toBeInTheDocument();
  });

  it("하트 버튼을 클릭해서 이벤트를 찜/찜 해제 할 수 있다.", async () => {
    const { user } = await render(<EventDetail id={4} />);
  });
});
// ❤️버튼을 클릭해서 이벤트를 찜/찜 해제 할 수 있다.
// ❤️버튼을 클릭하면 실시간으로 찜 숫자가 변경된다.

// 이벤트에 대한 댓글리스트가 최신순으로 보여진다.
// 로그인 안한 상태 -> 입력창이 없고 '댓글 작성을 위해서 로그인하세요' 문구가 보여짐
// 내가 작성한 댓글이면 '수정', '삭제' 버튼 노출
// 수정 버튼 클릭하면 input창으로 바뀜
// 수정 input에는 기존 댓글 내용 보여지고 수정할 수 있음
// 수정 '나가기' 버튼 클릭하면 input이 사라지고 리스트만 보임
// '등록' 버튼을 클릭하면 input사라지고 수정한 댓글 내용이 보여짐
// 댓글 입력창에 댓글을 작성할 수 있음
// '등록' 버튼을 클릭하면 댓글 리스트에 작성한 내용이 추가되고, 입력창은 초기화된다.
// 댓글 '삭제' 버튼을 클릭하면 컨펌 alert이 발생함
// 댓글이 삭제되면 댓글 리스트에서 해당 댓글이 삭제됨
