import { Comment } from "@/src/shared/components";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  userEvent.setup();
});

describe("CommentButton", () => {
  it("CommentButton을 클릭하면 onClick prop이 살행된다.", async () => {
    const onClickFn = jest.fn();

    render(
      <Comment.Button onClick={onClickFn} color="positive">
        버튼
      </Comment.Button>
    );

    await userEvent.click(screen.getByRole("button", { name: "버튼" }));

    expect(onClickFn).toHaveBeenCalledTimes(1);
  });
});

describe("CommentInput", () => {
  it("initConent prop이 전달되지 않으면 입력창이 비어있다.", () => {
    render(<Comment.Input />);

    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("initConent prop이 전달되면 입력창에 값이 나타난다.", () => {
    render(<Comment.Input initContent="테스트"></Comment.Input>);

    expect(screen.getByRole("textbox")).toHaveValue("테스트");
    expect(screen.getByText("테스트"));
  });

  it("입력창에 글자를 작성할 수 있다.", async () => {
    render(<Comment.Input />);

    expect(screen.getByRole("textbox")).toHaveValue("");

    await userEvent.type(screen.getByRole("textbox"), "테스트");

    expect(screen.getByRole("textbox")).toHaveValue("테스트");
    expect(screen.getByText("테스트"));
  });
});
