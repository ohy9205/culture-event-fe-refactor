import { User } from "../user/types";

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  eventId: number;
  commenter: number;
  User: Pick<User, "nick" | "email">;
};
