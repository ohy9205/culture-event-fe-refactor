import { render } from "@/src/__mocks__/lib";
import { screen } from "@testing-library/dom";
import { act } from "@testing-library/react";
import { Modal } from "..";

const closeFn = jest.fn();

jest.mock("../hook/useModal", () => () => {
  const original = jest.requireActual("../hook/useModal").default;

  return {
    ...original(),
    data: { isOpen: true, content: <div>Modal 컨텐츠</div> },
    close: closeFn,
  };
});

it("state의 isOpen이 true면 state에 저장된 content 요소가 모달로 보여진다.", async () => {
  await render(<Modal />);

  expect(screen.getByText("Modal 컨텐츠")).toBeInTheDocument();
});

it("모달이 켜졌을 때 모달의 background 요소를 클릭하면 모달창이 닫힌다.", async () => {
  const { user } = await render(<Modal />);

  const bg = screen.getByTestId("modal-background");
  await act(async () => await user.click(bg));

  expect(closeFn).toHaveBeenCalledTimes(1);
});
