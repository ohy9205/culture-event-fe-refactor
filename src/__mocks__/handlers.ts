import { auth, eventDetail, toggleFavoritEvent } from "./handler";

export const handlers = [...auth, ...eventDetail, ...toggleFavoritEvent];
