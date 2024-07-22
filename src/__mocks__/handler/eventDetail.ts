import { API_V1 } from "@/src/shared/consts";
import { rest } from "msw";
import response from "../response";

export const eventDetail = [
  rest.get(`${API_V1}/:eventId`, async (req, res, ctx) => {
    const { eventId } = req.params;
    if (eventId === "4") {
      return res(
        ctx.status(200),
        ctx.json({
          result: "success",
          payload: response.eventDetail,
        })
      );
    } else if (eventId === "1") {
      return res(
        ctx.status(404),
        ctx.json({
          result: "fail",
          payload: {},
        })
      );
    }
  }),
];
