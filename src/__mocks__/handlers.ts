import { authHandler } from "./handler";

export const handlers = [...authHandler];

// export const authHandler = [
//   rest.post(`${API_AUTH}/signIn`, async (req, res, ctx) => {
//     const { email, password } = await req.json();

//     // 로그인실패 : 올바르지 않은 형식의 이메일 (403)
//     if (email === "invalid@c") {
//       return res(
//         ctx.status(403),
//         ctx.json({
//           result: "fail",
//           status: 403,
//         })
//       );
//     }

//     // 로그인실패 : 틀린 이메일, 패스워드 (409)
//     if (email !== "test@test.com" || password !== "1234") {
//       return res(
//         ctx.status(409),
//         ctx.json({
//           result: "fail",
//           status: 409,
//         })
//       );
//     }

//     // 로그인성공
//     return res(
//       ctx.status(200),
//       ctx.json({
//         result: "success",
//         status: 200,
//         payload: response.signin,
//       })
//     );
//   }),

//   // 로그인 실패
//   rest.get("/user", () => {}),
// ];
