import { getFilteredEvents } from "@/src/apis/event/v2";
import Pagination from "@/src/components/UI/common/Pagination";
import ControlBox from "@/src/components/event/ControlBox";
import MapList from "@/src/components/event/MapList";
import PosterList from "@/src/components/event/PosterList";
import { FilterProvider } from "@/src/context/FilterContext";
import { PaginationProvider } from "@/src/context/PaginationContext";
import { objectToQueryString } from "@/src/utils/common/objectController";
import { Cookie } from "@/src/utils/store/cookieAdapter";
import { Token } from "@/src/utils/token/token";
import Link from "next/link";

const TAB_LIST = [
  { text: "포스터로보기", value: "poster" },
  { text: "지도로보기", value: "map" },
];
const PAGE_SIZE = 12;

const { allToken } = new Token(new Cookie());

export default async function Event({
  searchParams: query,
}: {
  searchParams: Record<string, any>;
}) {
  let apiQuery = query.pageIndex ? query : { ...query, pageIndex: 1 };
  const rs = await getFilteredEvents(apiQuery, allToken);

  return (
    <main className="w-full max-w-[1200px] flex flex-col items-center">
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
    </main>
  );
}
