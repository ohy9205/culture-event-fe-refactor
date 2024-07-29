import { render } from "@/src/__mocks__/lib";
import { AuthProvider } from "@/src/app/provider";
import { EventCommentList } from "@/src/entities/eventComments";
import { screen, waitFor, within } from "@testing-library/dom";
import { act } from "@testing-library/react";

const getInitComments = (eventId: number) => {
  return [
    {
      id: 5,
      content: "와 재미있겠다.",
      createdAt: "2024-02-04T15:19:10.000Z",
      updatedAt: "2024-03-30T07:24:52.000Z",
      eventId: eventId,
      commenter: 1,
      User: {
        email: "test@test.com",
        nick: "티모",
      },
    },
    {
      id: 9,
      content: "기대돼요.",
      createdAt: "2024-02-06T16:03:07.000Z",
      updatedAt: "2024-04-01T16:03:07.000Z",
      eventId: eventId,
      commenter: 1,
      User: {
        email: "test@test.com",
        nick: "티모",
      },
    },
    {
      id: 10,
      content: "테스트 테스트",
      createdAt: "2024-03-30T07:10:12.000Z",
      updatedAt: "2024-05-29T07:10:22.000Z",
      eventId: eventId,
      commenter: 1,
      User: {
        email: "yeon@test.com",
        nick: "yeon",
      },
    },
  ];
};

const TestComponent = ({ eventId }: { eventId: number }) => {
  return (
    <AuthProvider
      initialValue={{
        auth: {
          isLoggedIn: true,
          user: { email: "test@test.com", nick: "티모" },
        },
      }}>
      <EventCommentList
        eventId={eventId}
        initComments={getInitComments(eventId)}
      />
    </AuthProvider>
  );
};

const confirmFn = jest.fn((message?: string) => true);
window.confirm = confirmFn;

describe("render", () => {
  it("prop initComments에 데이터가 있으면 화면에 렌더링한다", async () => {
    await render(
      <EventCommentList eventId={1} initComments={getInitComments(1)} />
    );

    await expect(await screen.findByText("테스트 테스트")).toBeInTheDocument(); // 2024. 03. 29. 오후 04:10:22 (수정)
    await expect(await screen.findByText("와 재미있겠다.")).toBeInTheDocument(); // 2024. 03. 30. 오후 04:24:52 (수정)
    await expect(await screen.findByText("기대돼요.")).toBeInTheDocument(); // 2024. 02. 07. 오전 01:03:07
  });

  it("로그인 안하면 댓글 입력창 대신 '댓글 작성을 위해서 로그인하세요' 문구가 보여진다.", async () => {
    await render(
      <EventCommentList eventId={1} initComments={getInitComments(1)} />
    );

    await expect(
      await screen.findByText("댓글 작성을 위해서 로그인하세요")
    ).toBeInTheDocument(); // 2024. 03. 29. 오후 04:10:22 (수정)
  });

  it("내가 작성한 댓글에는 '수정', '삭제' 버튼이 보여진다.", async () => {
    await render(<TestComponent eventId={1} />);

    const list = screen.getAllByRole("listitem");

    expect(
      within(list[0]).getByRole("button", { name: "수정" })
    ).toBeInTheDocument();
    expect(
      within(list[1]).getByRole("button", { name: "수정" })
    ).toBeInTheDocument();
    expect(
      within(list[2]).queryByRole("button", { name: "수정" })
    ).not.toBeInTheDocument();

    expect(
      within(list[0]).getByRole("button", { name: "삭제" })
    ).toBeInTheDocument();
    expect(
      within(list[1]).getByRole("button", { name: "삭제" })
    ).toBeInTheDocument();
    expect(
      within(list[2]).queryByRole("button", { name: "삭제" })
    ).not.toBeInTheDocument();
  });
});

describe("modify", () => {
  it("수정 버튼 클릭하면 해당 댓글이 입력란으로 변경되며 댓글 내용이 기본값으로 입력되어 있다.", async () => {
    const { user } = await render(<TestComponent eventId={2} />);

    const comment = screen.getAllByRole("listitem")[0];

    await act(async () => await user.click(within(comment).getByText("수정")));

    const textarea = within(comment).getByTestId("modify-textarea");

    expect(textarea).toBeInTheDocument();

    expect(textarea).toHaveValue("와 재미있겠다.");
  });

  it("댓글을 수정하고 '등록' 버튼을 클릭하면 입력란이 사라지고 수정한 댓글 내용이 보여진다.", async () => {
    const { user } = await render(<TestComponent eventId={2} />);

    const comment = screen.getAllByRole("listitem")[0];

    await act(async () => {
      await user.click(within(comment).getByText("수정"));
    });

    const textarea = within(comment).getByTestId("modify-textarea");

    await user.clear(textarea);
    await user.type(textarea, "댓글을 수정했습니다.");
    await user.click(within(comment).getByText("등록"));

    await waitFor(async () => {
      expect(confirmFn).toHaveBeenCalledTimes(1);
      expect(confirmFn).toHaveBeenCalledWith("댓글을 수정 하시겠습니까?");

      expect(
        await screen.findByText("댓글을 수정했습니다.")
      ).toBeInTheDocument();

      expect(
        within(comment).queryByTestId("modify-textarea")
      ).not.toBeInTheDocument();

      expect(screen.queryByText("와 재미있겠다.")).not.toBeInTheDocument();
    });
  });

  it("댓글 수정 중 '나가기' 버튼 클릭하면 입력란이 사라지고 기존 댓글 내용이 보여진다.", async () => {
    const { user } = await render(<TestComponent eventId={2} />);

    const comment = screen.getAllByRole("listitem")[0];

    await act(async () => await user.click(within(comment).getByText("수정")));

    const textarea = within(comment).getByTestId("modify-textarea");

    await user.clear(textarea);
    await user.type(textarea, "댓글을 수정했습니다.");
    await act(async () => await user.click(screen.getByText("나가기")));

    expect(
      within(comment).queryByTestId("modify-textarea")
    ).not.toBeInTheDocument();
    expect(within(comment).getByText("와 재미있겠다.")).toBeInTheDocument();
  });
});

describe("add", () => {
  it("댓글 입력창에 댓글을 작성할 수 있다.", async () => {
    const { user } = await render(<TestComponent eventId={3} />);

    const textarea = await screen.findByRole("textbox");

    await user.type(textarea, "새로운 댓글을 추가합니다.");

    expect(textarea).toHaveValue("새로운 댓글을 추가합니다.");
  });

  it("댓글 작성 후 '등록' 버튼을 클릭하면 새로운 댓글이 추가되고 댓글 입력란은 초기화된다.", async () => {
    const { user } = await render(<TestComponent eventId={3} />);

    const textarea = await screen.findByRole("textbox");

    await user.type(textarea, "새로운 댓글을 추가합니다.");
    await user.click(screen.getByRole("button", { name: "등록" }));

    await waitFor(async () => {
      expect(
        await screen.findByText("새로운 댓글을 추가합니다.")
      ).toBeInTheDocument();

      expect(await screen.findByRole("textbox")).toHaveValue("");
    });
  });
});

describe("delete", () => {
  it("댓글 '삭제' 버튼을 클릭하면 댓글 리스트에서 해당 댓글이 사라진다.", async () => {
    const { user } = await render(<TestComponent eventId={4} />);

    const comment = screen.getAllByRole("listitem")[0];

    await user.click(within(comment).getByText("삭제"));

    await waitFor(async () => {
      expect(confirmFn).toHaveBeenCalledWith("정말 댓글을 삭제 하시겠습니까?");

      expect(screen.queryByText("와 재미있겠다.")).not.toBeInTheDocument();
    });
  });
});
