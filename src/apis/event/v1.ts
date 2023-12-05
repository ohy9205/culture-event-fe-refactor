import { APIResponse } from "@/src/types/APIResponse";
import { Event } from "@/src/types/events";
import { APIFetch } from "../common/commonAPIFetch";
import { API_V1 } from "../common/url";

// 최신순
export async function getRecentEvents(): Promise<APIResponse> {
  const url = `${API_V1}/latest`;
  const rs = await APIFetch(url, "GET");
  const data = rs?.payload.events.rows.map((event: Event) => ({
    thumbnail: event.thumbnail,
    id: event.id,
    title: event.title,
  }));

  return {
    ...rs,
    payload: data,
  };
}

//인기순
export async function getHotEvents(): Promise<APIResponse> {
  const url = `${API_V1}/likes`;
  const rs = await APIFetch(url, "GET");
  const data = rs?.payload.events.rows.map((event: Event) => ({
    thumbnail: event.thumbnail,
    id: event.id,
    title: event.title,
  }));

  return {
    ...rs,
    payload: data,
  };
}

//조회순
export async function getViewEvents(): Promise<APIResponse> {
  const url = `${API_V1}/views`;
  const rs = await APIFetch(url, "GET");
  const data = rs?.payload.events.rows.map((event: Event) => ({
    thumbnail: event.thumbnail,
    id: event.id,
    title: event.title,
  }));

  return {
    ...rs,
    payload: data,
  };
}

// 상세정보
export async function getEventDetailWithoutLogin(
  id: number
): Promise<APIResponse> {
  const url = `${API_V1}/${id}`;
  const rs = await APIFetch(url, "GET");

  // return rs.payload.event;
  return rs;
}
