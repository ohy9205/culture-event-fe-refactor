import { SigninForm } from "@/src/entities/auth";
import { describe, expect, it, jest } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

userEvent.setup();

const alertFn = jest.fn();
window.alert = alertFn;

// const useStore = new ZustandStore({})

it("이메일, 비밀번호를 입력할 수 있다.", async () => {
  render(<SigninForm />);

  const emailInput = screen.getByPlaceholderText("email@culture.com");
  const passwordInput = screen.getByPlaceholderText("password");

  await userEvent.type(emailInput, "test@test.com");
  expect(screen.getByDisplayValue("test@test.com")).toBeInTheDocument();

  await userEvent.type(passwordInput, "1234");
  expect(screen.getByDisplayValue("1234")).toBeInTheDocument();
});

describe("유효성검사", () => {
  it("이메일이나 비밀번호 란이 비워져 있으면 각 input이 invalid된다.", async () => {
    render(<SigninForm />);

    const emailInput = screen.getByPlaceholderText("email@culture.com");
    const passwordInput = screen.getByPlaceholderText("password");

    // 비밀번호 란만 비워져 있는 경우
    await userEvent.type(emailInput, "test@test.com");

    expect(passwordInput).toBeInvalid(); // 유효하지 않음
    expect(emailInput).toBeValid(); // 유효함

    await userEvent.clear(emailInput);

    // 이메일 란만 비워져 있는 경우
    await userEvent.type(passwordInput, "1234");

    expect(passwordInput).toBeValid(); // 유효함
    expect(emailInput).toBeInvalid(); // 유효하지 않음
  });

  it("이메일에 @가 없거나, @뒤에 주소가 없을 경우 input이 invalid된다.", async () => {
    render(<SigninForm />);

    const emailInput = screen.getByPlaceholderText("email@culture.com");

    await userEvent.type(emailInput, "test");

    expect(emailInput).toBeInvalid();

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "test@");

    expect(emailInput).toBeInvalid();

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "test@com");

    expect(emailInput).toBeValid();
  });
});

describe("로그인 성공", () => {
  it("로그인 버튼을 클릭하면 로그인에 성공했다는 alert이 뜬 후 '/' 경로로 이동한다.", async () => {
    render(<SigninForm />);

    const button = screen.getByText("로그인");
    const emailInput = screen.getByPlaceholderText("email@culture.com");
    const passwordInput = screen.getByPlaceholderText("password");

    await userEvent.type(emailInput, "test@test.com");
    await userEvent.type(passwordInput, "1234");
    await userEvent.click(button);

    expect(alertFn).toHaveBeenCalledWith("로그인에 성공했습니다.");
    expect(window.location.href).toBe("/");
  });
});

describe("로그인 실패", () => {
  it("이메일, 비밀번호가 틀리면 '로그인에 실패하였습니다. 이메일 또는 비밀번호를 확인해주세요.' 메시지가 조회되고 폼이 초기화된다.", async () => {
    render(<SigninForm />);

    const button = screen.getByText("로그인");
    const emailInput = screen.getByPlaceholderText("email@culture.com");
    const passwordInput = screen.getByPlaceholderText("password");

    await userEvent.type(emailInput, "none@test.com");
    await userEvent.type(passwordInput, "12345");
    await userEvent.click(button);

    // api 통신 후...
    expect(alertFn).toHaveBeenCalledWith(
      "로그인에 실패하였습니다. 이메일 또는 비밀번호를 확인해주세요."
    );
    await waitFor(() =>
      expect(
        screen.queryByDisplayValue("none@test.com")
      ).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.queryByDisplayValue("12345")).not.toBeInTheDocument()
    );
  });

  it("올바른 이메일 형식이 아닌데 서버에 전송된 경우 input아래에 '올바르지 않은 이메일 형식입니다.' 메시지가 나타나고 폼이 초기화된다.", async () => {
    // input의 valid체크를 통과하기 때문에 로그인 요청이 들어간다.

    render(<SigninForm />);

    const button = screen.getByText("로그인");
    const emailInput = screen.getByPlaceholderText("email@culture.com");
    const passwordInput = screen.getByPlaceholderText("password");

    await userEvent.type(emailInput, "invalid@c");
    await userEvent.type(passwordInput, "1234");
    await userEvent.click(button);

    // api 통신 후...
    expect(
      await screen.findByText("올바르지 않은 이메일 형식입니다.")
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByDisplayValue("invalid@c")).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.queryByDisplayValue("1234")).not.toBeInTheDocument()
    );
  });
});
