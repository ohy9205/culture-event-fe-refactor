// "use client";

import { getFilteredEvents } from "@/src/apis/event/v2";
import { FilterProvider } from "@/src/context/FilterContext";
import { PaginationProvider } from "@/src/context/PaginationContext";
import { objectToQueryString } from "@/src/utils/objectController/objectController";
import { CookieTokenAdapter } from "@/src/utils/token/cookieAdapter";
import Link from "next/link";
import ControlBox from "./ControlBox";
import MapList from "./MapList";
import Pagination from "./Pagination";
import PosterList from "./PosterList";

const TAB_LIST = [
  { text: "포스터로보기", value: "poster" },
  { text: "지도로보기", value: "map" },
];

const cookie = new CookieTokenAdapter();
const PAGE_SIZE = 12;

const FilteredEventList = async ({ query }: { query: Record<string, any> }) => {
  let apiQuery = query.pageIndex ? query : { ...query, pageIndex: 1 };
  const rs = await getFilteredEvents(apiQuery, {
    at: cookie.getToken("at"),
    rt: cookie.getToken("rt"),
  });

  return (
    <>
      <FilterProvider query={query}>
        <ControlBox />
        {TAB_LIST.map((tab) => (
          <Link
            key={tab.text}
            href={`/event?${objectToQueryString(
              { ...query, tab: tab.value },
              "&"
            )}`}
          >
            {tab.text}
          </Link>
        ))}
        <PaginationProvider initPageIndex={apiQuery.pageIndex}>
          {query.tab !== "map" && <PosterList list={rs.payload.events} />}
          {query.tab === "map" && <MapList list={rs.payload.events} />}
          <Pagination totalPage={rs.payload.totalPage} pageSize={PAGE_SIZE} />
        </PaginationProvider>
      </FilterProvider>
    </>
  );
};

export default FilteredEventList;
