export type Event = {
  id: number;
  category: EventCategory;
  location: EventLocation;
  isFree: boolean;
  title: string;
  eventPeriod: string;
  place: string;
  hostOrganization: string;
  targetAudience: string;
  fee: string;
  performerInfo: string;
  programInfo: string;
  otherInfo: string;
  homePage: string;
  latitude: string;
  longitude: string;
  thumbnail: string;
  startDate: string;
  endDate: string;
  views: number;
  createdAt: string;
  updatedAt: string;
};

export type DetailEvent = Pick<
  Event,
  | "id"
  | "thumbnail"
  | "title"
  | "category"
  | "place"
  | "eventPeriod"
  | "targetAudience"
  | "homePage"
  | "fee"
  | "isFree"
  | "longitude"
  | "latitude"
>;

export type SimpleEventList = {
  events: Pick<Event, "id" | "title" | "thumbnail" | "eventPeriod" | "views">[];
  totalPage: number;
};

export type EventThumbnail = Pick<Event, "thumbnail" | "id" | "title">;

type EventCategory =
  | "강남구"
  | "강동구"
  | "강북구"
  | "강서구"
  | "관악구"
  | "광진구"
  | "구로구"
  | "금천구"
  | "노원구"
  | "도봉구"
  | "동대문구"
  | "동작구"
  | "마포구"
  | "서대문구"
  | "서초구"
  | "성동구"
  | "성북구"
  | "송파구"
  | "양천구";
type EventLocation =
  | "콘서트"
  | "클래식"
  | "뮤지컬/오페라"
  | "연극"
  | "무용"
  | "국악"
  | "독주/독창회"
  | "전시/미술"
  | "축제-기타"
  | "축제-문화/예술"
  | "축제-자연/경관"
  | "축제-전통/역사"
  | "축제-시민화합"
  | "교육/체험"
  | "기타";
