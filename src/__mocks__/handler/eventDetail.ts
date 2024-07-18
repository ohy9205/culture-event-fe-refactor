import { API_V1 } from "@/src/shared/consts";
import { rest } from "msw";
import response from "../response";

export const eventDetail = [
  rest.get(`${API_V1}/4`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        result: "success",
        payload: response.eventDetail,
      })
    );
  }),
];
