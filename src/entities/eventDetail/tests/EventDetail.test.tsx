import { render } from "@/src/__mocks__/lib";
import { AuthProvider } from "@/src/app/provider";
import { describe, expect, it, jest } from "@jest/globals";
import { screen, waitFor, within } from "@testing-library/dom";
import { act } from "@testing-library/react";
import { EventDetail } from "..";

// prop으로 받은 event id에 대한 상세정보가 보여진다.
// => 이미지, 장르, 장소, 기간, 대상, 요금,
// 이벤트 위치에 대한 맵이 보여진다.
// '상세정보 보러가기'를 클릭하면 해당 이벤트 홈페이지로 링크가 연결된다.
const LoggedInTestComponent = ({ eventId }: { eventId: number }) => {
  return (
    <AuthProvider
      initialValue={{
        auth: {
          isLoggedIn: true,
          user: { email: "test@test.com", nick: "티모" },
        },
      }}>
      <EventDetail id={eventId} />
    </AuthProvider>
  );
};

describe("Event Info", () => {
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

  it("이벤트 상세 정보가 없으면 404 페이지로 이동한다.", async () => {
    await render(<EventDetail id={1} />);

    await waitFor(() =>
      expect(window.location.replace).toHaveBeenCalledWith("/error/404")
    );
  });
});

describe("Like Button", () => {
  it("찜 버튼을 클릭하면 실시간으로 찜 숫자가 변경된다.", async () => {
    const { user } = await render(<LoggedInTestComponent eventId={4} />);

    const button = await screen.findByRole("button", { name: "🤍" });
    const count = await screen.findByTestId("like-count");

    expect(within(count).getByText("1")).toBeInTheDocument();

    await act(async () => await user.click(button));
    expect(await within(count).findByText("2")).toBeInTheDocument();
  });
});

describe("Comment", () => {
  it("이벤트에 대한 댓글들이 보여진다.", async () => {
    const { findByText } = await render(<EventDetail id={4} />);

    expect(await findByText("재밌겠다.")).toBeInTheDocument(); // 2024. 03. 30. 오후 04:24:52 (수정)
    expect(await findByText("나도가야지")).toBeInTheDocument(); // 2024. 02. 07. 오전 01:03:07
    expect(await findByText("울랄라")).toBeInTheDocument(); // 2024. 03. 30. 오후 04:10:22 (수정)
  });
});
