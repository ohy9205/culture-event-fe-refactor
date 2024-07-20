import { render } from "@/src/__mocks__/lib";
import { AuthProvider, MyLikesProvider } from "@/src/app/provider";
import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/dom";
import { act } from "@testing-library/react";
import { LikeButton } from "..";
import { MyLikesState } from "../../user";
// 로그인 하지 않으면 ❤️버튼은 비활성화된다.
// ❤️버튼을 클릭해서 이벤트를 찜/찜 해제 할 수 있다.
// ❤️버튼을 클릭하면 실시간으로 찜 숫자가 변경된다.

const eventId = 4;

it("로그인하지 않으면 찜 버튼은 🤍모양이고 비활성화 된다.", async () => {
  await render(<LikeButton eventId={eventId} />);

  const button = screen.getByText("🤍");

  expect(button).toHaveAttribute("disabled");
});

it("children prop을 받으면 버튼 옆에 보여진다.", async () => {
  await render(
    <LikeButton eventId={eventId}>
      <div>자식컴포넌트</div>
    </LikeButton>
  );

  expect(screen.getByText("자식컴포넌트")).toBeInTheDocument();
});

describe("로그인 상태", () => {
  const TestComponent = ({
    eventId,
    children,
    myLikesProp,
  }: {
    eventId: number;
    children?: React.ReactNode;
    myLikesProp?: MyLikesState;
  }) => {
    return (
      <AuthProvider
        initialValue={{
          auth: {
            isLoggedIn: true,
            user: { email: "test@test.com", nick: "티모" },
          },
        }}>
        <MyLikesProvider initialValue={myLikesProp}>
          <LikeButton eventId={eventId}>{children}</LikeButton>
        </MyLikesProvider>
      </AuthProvider>
    );
  };

  it("버튼을 클릭해서 이벤트를 찜 할 수 있다.", async () => {
    const { user } = await render(<TestComponent eventId={eventId} />);

    // 화면이 업데이트 되었는지 확인
    const button = await screen.findByRole("button", { name: "🤍" });

    await act(async () => await user.click(button));
    expect(await screen.findByText("❤️")).toBeInTheDocument();
  });

  it("찜 상태인 버튼을 클릭하면 찜이 해제된다.", async () => {
    const { user } = await render(
      <TestComponent
        eventId={5}
        myLikesProp={{
          myLikes: [
            {
              id: 5,
              period: "2024-01-01~2024-12-31",
              thumbnail:
                "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=cb2af3a9757741aa996b416188cbffcf&thumb=Y",
              title: "[영화의날] 자동차 극장 나들이!",
            },
          ],
        }}
      />
    );

    const button = await screen.findByRole("button", { name: "❤️" });
    expect(button).toBeInTheDocument();

    await user.click(button);
    await expect(
      await screen.findByRole("button", { name: "🤍" })
    ).toBeInTheDocument();
  });
});
