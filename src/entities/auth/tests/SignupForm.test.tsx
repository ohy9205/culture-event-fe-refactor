import { render } from "@/src/__mocks__/lib";
import { SignupForm } from "@/src/entities/auth";
import { expect, it, jest } from "@jest/globals";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const alertFn = jest.fn();
global.alert = alertFn;

userEvent.setup();

it("폼을 입력할 수 있다.", async () => {
  const { user } = await render(<SignupForm />);

  await user.type(
    screen.getByPlaceholderText("email@culture.com"),
    "test@test.com"
  );
  expect(screen.getByDisplayValue("test@test.com")).toBeInTheDocument();

  await user.type(screen.getByPlaceholderText("nick"), "테스터");
  expect(screen.getByDisplayValue("테스터")).toBeInTheDocument();

  await user.type(screen.getByPlaceholderText("password"), "1234");
  expect(screen.getByDisplayValue("1234")).toBeInTheDocument();

  await user.type(screen.getByPlaceholderText("password Confirm"), "12345");
  expect(screen.getByDisplayValue("12345")).toBeInTheDocument();
});

it("비밀번호 확인란의 내용이 비밀번호 란과 일치하지 않으면 실시간으로 회원가입 버튼 상단에 valid메시지가 나타난다.", async () => {
  const { user } = await render(<SignupForm />);

  await user.type(screen.getByPlaceholderText("password"), "1234");
  await user.type(screen.getByPlaceholderText("password Confirm"), "12345");

  expect(screen.getByText("비밀번호가 일치하지 않습니다")).toBeInTheDocument();
});

it("폼 내용이 모두 작성되지 않으면 회원가입 버튼이 활성화 되지 않는다.", async () => {
  const { user } = await render(<SignupForm />);

  await user.type(
    screen.getByPlaceholderText("email@culture.com"),
    "test@test.com"
  );

  expect(screen.getByRole("button", { name: "회원가입" })).toBeDisabled();
});

it("회원 가입에 성공하면 '회원가입에 성공했습니다,' alert이 나타나고 /signin 페이지로 이동한다", async () => {
  const { user, router } = await render(<SignupForm />);

  await user.type(
    screen.getByPlaceholderText("email@culture.com"),
    "test@test.com"
  );
  await user.type(screen.getByPlaceholderText("nick"), "테스터");
  await user.type(screen.getByPlaceholderText("password"), "1234");
  await user.type(screen.getByPlaceholderText("password Confirm"), "1234");
  await user.click(screen.getByRole("button", { name: "회원가입" }));

  await waitFor(async () => {
    expect(alertFn).toHaveBeenCalledWith("회원가입에 성공했습니다.");
    expect(router.push).toHaveBeenCalledWith("/signin");
  });
});

it("403에러로 회원 가입에 실패하면 회원가입 버튼 상단에 응답 결과로 받은 문구('403에러')가 나타난다.", async () => {
  const { user } = await render(<SignupForm />);

  await user.type(
    screen.getByPlaceholderText("email@culture.com"),
    "status403@test.com"
  );
  await user.type(screen.getByPlaceholderText("nick"), "테스터");
  await user.type(screen.getByPlaceholderText("password"), "1234");
  await user.type(screen.getByPlaceholderText("password Confirm"), "1234");
  await user.click(screen.getByRole("button", { name: "회원가입" }));

  expect(await screen.findByText("403에러")).toBeInTheDocument();
});

it("409에러로 회원 가입에 실패하면 회원가입 버튼 상단에 응답 결과로 받은 문구('409에러')가 나타난다.", async () => {
  const { user } = await render(<SignupForm />);

  await user.type(
    screen.getByPlaceholderText("email@culture.com"),
    "status409@test.com"
  );
  await user.type(screen.getByPlaceholderText("nick"), "테스터");
  await user.type(screen.getByPlaceholderText("password"), "1234");
  await user.type(screen.getByPlaceholderText("password Confirm"), "1234");
  await user.click(screen.getByRole("button", { name: "회원가입" }));

  expect(await screen.findByText("409에러")).toBeInTheDocument();
});
