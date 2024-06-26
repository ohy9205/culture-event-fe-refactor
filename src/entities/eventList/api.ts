import { Fetch } from "@/src/shared/fetch";
import { objectToQueryString } from "@/src/shared/lib";
import { APIResponse } from "@/src/shared/types";
import { API_V1, API_V2 } from "../../shared/consts/consts";
import { Event, EventThumbnail, SimpleEvent } from "./types";

type FilteredEventsPayload = {
  events: { rows: SimpleEvent[]; count: number };
  totalPage: number;
};

type MainEventsPayload = {
  events: {
    count: number;
    rows: Event[];
  };
};

const v1_url = API_V1;
const v2_url = API_V2;

const PAGE_SIZE = 12;

//  필터링
export const getFilteredEvents = async (
  queryObj: Record<string, any>,
  cookie?: Record<string, any>
): Promise<APIResponse<{ events: SimpleEvent[]; totalPage: number }>> => {
  const apiFetch = new Fetch(cookie);

  const rs = await apiFetch.fetching<FilteredEventsPayload>(
    `${v2_url}?${objectToQueryString(queryObj, "&")}&pageSize=${PAGE_SIZE}`
  );

  const payload = {
    events: rs.payload.events.rows,
    totalPage: rs.payload.totalPage,
  };

  return {
    ...rs,
    payload,
  };
};

// 최신순
export const getRecentEvents = async (): Promise<
  APIResponse<EventThumbnail[]>
> => {
  const apiFetch = new Fetch();
  apiFetch.setRevalidate(21600);
  const rs = await apiFetch.fetching<MainEventsPayload>(`${v1_url}/latest`);
  const data = rs?.payload.events.rows.map((event: Event) => ({
    thumbnail: event.thumbnail,
    id: event.id,
    title: event.title,
  }));

  return {
    ...rs,
    payload: data,
  };
};

//인기순
export const getHotEvents = async (): Promise<
  APIResponse<EventThumbnail[]>
> => {
  const apiFetch = new Fetch();
  apiFetch.setRevalidate(21600);
  const rs = await apiFetch.fetching<MainEventsPayload>(`${v1_url}/likes`);
  const data = rs?.payload.events.rows.map((event: Event) => ({
    thumbnail: event.thumbnail,
    id: event.id,
    title: event.title,
  }));

  return {
    ...rs,
    payload: data,
  };
};

//조회순
export const getViewEvents = async (): Promise<
  APIResponse<EventThumbnail[]>
> => {
  const apiFetch = new Fetch();
  apiFetch.setRevalidate(21600);
  const rs = await apiFetch.fetching<MainEventsPayload>(`${v1_url}/views`);
  const data = rs?.payload.events.rows.map((event: Event) => ({
    thumbnail: event.thumbnail,
    id: event.id,
    title: event.title,
  }));

  return {
    ...rs,
    payload: data,
  };
};
