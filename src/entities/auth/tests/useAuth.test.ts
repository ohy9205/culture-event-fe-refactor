import { useAuth } from "@/src/entities/auth";
import { ResponseHandler } from "@/src/shared/types";
import { describe, expect, it, jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import { Signin, Signup } from "../types";

const successFn = jest.fn();

const handler: ResponseHandler = {
  success: successFn,
};

describe("signin", () => {
  it("로그인에 성공하면 상태가 isLoggedIn: true, user: {email: 'test@test.com', nick: 'yeon'}로 업데이트 된다.", async () => {
    const form: Signin = {
      email: "test@test.com",
      password: "1234",
    };

    const { result } = renderHook(useAuth);

    await act(async () => await result.current.signin(form, handler));

    expect(result.current.data.isLoggedIn).toBe(true);
    expect(result.current.data.user).toEqual({
      email: "test@test.com",
      nick: "yeon",
    });
  });

  it("로그인에 성공하면 handler.success가 실행된다", async () => {
    const form: Signin = {
      email: "test@test.com",
      password: "1234",
    };

    const { result } = renderHook(useAuth);

    await act(async () => await result.current.signin(form, handler));

    expect(successFn).toHaveBeenCalledTimes(1);
  });
});

describe("signout", () => {
  it("로그아웃에 성공하면 상태가 isLoggedIn: false, user: {email: null, nick: null}}로 업데이트 된다.", async () => {
    const { result } = renderHook(useAuth);

    await act(async () => await result.current.signout(handler));

    expect(result.current.data).toEqual({
      isLoggedIn: false,
      user: { email: null, nick: null },
    });
  });

  it("로그아웃에 성공하면 response.handler가 실행된다.", async () => {
    const { result } = renderHook(useAuth);

    await act(async () => await result.current.signout(handler));

    expect(successFn).toHaveBeenCalledTimes(1);
  });
});

describe("signup", () => {
  it("회원가입에 성공하면 response.success가 실행된다", async () => {
    const form: Signup = {
      email: "test@test.com",
      nick: "yeon",
      password: "1234",
      passwordConfirm: "1234",
    };

    const { result } = renderHook(useAuth);

    await act(async () => await result.current.signup(form, handler));

    expect(successFn).toHaveBeenCalledTimes(1);
  });
});
