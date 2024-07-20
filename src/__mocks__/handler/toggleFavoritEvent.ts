import { API_V2 } from "@/src/shared/consts";
import { rest } from "msw";
import response from "../response";

export const toggleFavoritEvent = [
  rest.post(`${API_V2}/4/likes`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        result: "success",
        payload: response.toggleFavoritEvent.add,
      })
    );
  }),
  rest.post(`${API_V2}/5/likes`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        result: "success",
        payload: response.toggleFavoritEvent.remove,
      })
    );
  }),
];
