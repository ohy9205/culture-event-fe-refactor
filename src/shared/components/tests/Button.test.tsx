import { Button } from "@/src/shared/components";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

const handlerFn = jest.fn();

it("prop으로 받은 children요소가 렌더된다.", async () => {
  render(<Button>테스트버튼</Button>);

  expect(screen.getByRole("button", { name: "테스트버튼" }));
});

it("버튼을 클릭하면 prop으로 받은 핸들러가 실행된다.", async () => {
  render(<Button onClick={handlerFn}>버튼</Button>);

  userEvent.setup();
  await userEvent.click(screen.getByRole("button", { name: "버튼" }));
  expect(handlerFn).toHaveBeenCalledTimes(1);
});

it("size prop을 받으면 스타일링이 적용된다.", () => {
  const { getByRole, rerender } = render(<Button size="sm">버튼</Button>);
  expect(getByRole("button", { name: "버튼" })).toHaveClass(
    "px-2 py-2 text-xs"
  );

  rerender(<Button size="md">버튼</Button>);
  expect(getByRole("button", { name: "버튼" })).toHaveClass(
    "px-5 py-2 text-sm"
  );

  rerender(<Button size="lg">버튼</Button>);
  expect(getByRole("button", { name: "버튼" })).toHaveClass(
    "px-7 py-4 text-lg"
  );
});

it("color prop을 받으면 스타일링이 적용된다.", () => {
  const { getByRole, rerender } = render(<Button color="dark">버튼</Button>);
  expect(getByRole("button", { name: "버튼" })).toHaveClass(
    "bg-slate-900 text-white"
  );

  rerender(<Button color="light">버튼</Button>);
  expect(getByRole("button", { name: "버튼" })).toHaveClass("bg-slate-200");

  rerender(<Button color="normal">버튼</Button>);
  expect(getByRole("button", { name: "버튼" })).toHaveClass(
    "bg-slate-500 text-white"
  );
});
