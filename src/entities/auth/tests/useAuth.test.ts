import { useAuth } from "@/src/entities/auth";
import { ResponseHandler } from "@/src/shared/types";
import { describe, expect, it, jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import { Signin } from "../types";

const successFn = jest.fn();
const status403Fn = jest.fn();
const status409Fn = jest.fn();

const handler: ResponseHandler = {
  success: successFn,
  status403: status403Fn,
  status409: status409Fn,
};

describe("signin", () => {
  it("{email: 'test@test.com', password: '1234'}로그인에 성공하면 isLoggedIn: true, user: {email: 'test@test.com', nick: 'yeon'}로 업데이트 된다.", async () => {
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

    await result.current.signin(form, handler);

    expect(successFn).toHaveBeenCalledTimes(1);
  });

  it("로그인에 실패하면 handler.status403이 실행된다. (403에러)", async () => {
    const form: Signin = {
      email: "invalid@c",
      password: "1234",
    };

    const { result } = renderHook(useAuth);

    await result.current.signin(form, handler);

    expect(status403Fn).toHaveBeenCalledTimes(1);
  });

  it("로그인에 실패하면 handler.status409가 실행된다. (409에러)", async () => {
    const form: Signin = {
      email: "test@test.com",
      password: "wrong-password",
    };

    const { result } = renderHook(useAuth);

    await result.current.signin(form, handler);

    expect(status409Fn).toHaveBeenCalledTimes(1);
  });
});

describe("signout", () => {
  it("", async () => {});
});

describe("signup", () => {
  it("", async () => {});
});
