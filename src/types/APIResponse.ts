import { Comment, DetailEvent, Event, SimpleEvent } from "./events";
import { MyComment, MyFavoriteEvent, User } from "./user";

export type APIResponse<T> = {
  status: number;
  result: "success" | "fail";
  message: string;
  payload: T;
};

// payload에 들어있는 데이터 타입들
// event
export type MainEventsPayload = {
  events: {
    count: number;
    rows: Event[];
  };
};

export type EventDetailPayload = {
  event: DetailEvent;
};

export type FilteredEventsPayload = {
  events: { rows: SimpleEvent[]; count: number };
  totalPage: number;
};

export type EventCommentsPayload = {
  comments: Comment[];
};

export type ToggleLikesPaload = {
  action: "add" | "remove";
  event: MyFavoriteEvent;
  evnetLikesCount: number;
};

// auth
export type SigninPayload = User;

export type SignupPayload = {
  email: string;
};

export type SignoutPayload = {};

// user
export type UserInfoPayload = {
  user: User;
};

export type UserLikesPayload = {
  data: MyFavoriteEvent[];
};

export type UserCommentsPayload = {
  commentsWithEvents: MyComment[];
};

// comments
export type AddCommentPayload = {
  commentId: number;
  content: string;
};

export type DeleteCommentPayload = {};

export type PatchCommentPayload = {
  content: string;
};
