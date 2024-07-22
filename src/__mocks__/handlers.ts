import { auth, comment, eventDetail, toggleFavoritEvent } from "./handler";

export const handlers = [
  ...auth,
  ...eventDetail,
  ...toggleFavoritEvent,
  ...comment,
];
