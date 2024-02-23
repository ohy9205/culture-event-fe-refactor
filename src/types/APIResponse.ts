import { DetailEvent, Event, SimpleEvent } from "./events";

export type APIResponse<T> = {
  status: number;
  result: "success" | "fail";
  message: string;
  payload: T;
};

// payload에 들어있는 데이터 타입들
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
  events: SimpleEvent[];
  totalPage: number;
};
