import { Signup } from "@/src/entities/auth/types";
import { API_AUTH } from "@/src/shared/consts";
import { rest } from "msw";
import response from "../response";

export const authHandler = [
  rest.post(`${API_AUTH}/signIn`, async (req, res, ctx) => {
    const { email, password } = await req.json();

    // 로그인실패 : 올바르지 않은 형식의 이메일 (403)
    if (email === "invalid@c") {
      return res(
        ctx.status(403),
        ctx.json({
          result: "fail",
          status: 403,
          message: "올바르지 않은 이메일 형식입니다.",
        })
      );
    }

    // 로그인실패 : 틀린 이메일, 패스워드 (409)
    if (email !== "test@test.com" || password !== "1234") {
      return res(
        ctx.status(409),
        ctx.json({
          message: "로그인에 실패하였습니다.",
          result: "fail",
        })
      );
    }

    // 로그인성공
    return res(
      ctx.status(200),
      ctx.json({
        result: "success",
        payload: response.signin,
      })
    );
  }),

  rest.post(`${API_AUTH}/signUp`, async (req, res, ctx) => {
    const { email, nick, password, passwordConfirm }: Signup = await req.json();
    if (email === "status403@test.com") {
      return res(
        ctx.status(403),
        ctx.json({ result: "fail", message: "403에러" })
      );
    }
    if (email === "status409@test.com") {
      return res(
        ctx.status(409),
        ctx.json({ result: "fail", message: "409에러" })
      );
    }

    return res(ctx.json(200), ctx.json({ result: "success", message: "성공" }));
  }),

  rest.post(`${API_AUTH}/signOut`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ result: "success" }));
  }),
];
