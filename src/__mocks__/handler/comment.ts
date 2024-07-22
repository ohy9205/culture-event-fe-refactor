import { API_COMMENT, API_V2 } from "@/src/shared/consts";
import { rest } from "msw";
import response from "../response";

export const comment = [
  rest.patch(`${API_COMMENT}/5`, async (req, res, ctx) => {
    const newComment = await req.json();

    return res(
      ctx.status(200),
      ctx.json({
        result: "success",
        payload: newComment,
      })
    );
  }),

  rest.post(`${API_COMMENT}`, async (req, res, ctx) => {
    const newComment = await req.json();

    return res(
      ctx.status(200),
      ctx.json({
        result: "success",
        payload: newComment,
      })
    );
  }),

  rest.delete(`${API_COMMENT}/5`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        result: "success",
        payload: {},
      })
    );
  }),

  rest.get(`${API_V2}/:eventId/comments`, async (req, res, ctx) => {
    const { eventId } = req.params;

    if (eventId === "2") {
      // 댓글 수정 시
      return res(
        ctx.status(200),
        ctx.json({
          result: "success",
          payload: response.comment.update,
        })
      );
    } else if (eventId === "3") {
      // 댓글 추가 시
      return res(
        ctx.status(200),
        ctx.json({
          result: "success",
          payload: response.comment.add,
        })
      );
    } else if (eventId === "4") {
      // 댓글 삭제 시
      return res(
        ctx.status(200),
        ctx.json({
          result: "success",
          payload: response.comment.delete,
        })
      );
    }
  }),
];
