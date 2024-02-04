import { getFilteredEvents } from "@/src/apis/event/v2";
import Pagination from "@/src/components/UI/common/Pagination";
import ControlBox from "@/src/components/event/ControlBox";
import FilteredEventList from "@/src/components/event/FilteredEventList";
import { FilterProvider } from "@/src/context/FilterContext";
import { PaginationProvider } from "@/src/context/PaginationContext";
import { Cookie } from "@/src/utils/store/cookieAdapter";
import { Token } from "@/src/utils/token/token";

const { allToken } = new Token(new Cookie());

export default async function Event({
  searchParams: query,
}: {
  searchParams: Record<string, any>;
}) {
  let apiQuery = query.pageIndex ? query : { ...query, pageIndex: 1 };
  const rs = await getFilteredEvents(apiQuery, allToken);

  return (
    <main className="w-full max-w-[1200px] flex flex-col items-center gap-8 px-4">
      <FilterProvider query={query}>
        <PaginationProvider initPageIndex={query.pageIndex}>
          <ControlBox />
          <FilteredEventList events={rs.payload.events} />
          <Pagination totalPage={rs.payload.totalPage} />
        </PaginationProvider>
      </FilterProvider>
    </main>
  );
}
