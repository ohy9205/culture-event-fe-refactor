import { getFilteredEvents } from "@/src/apis/event/v2";
import Pagination from "@/src/components/UI/common/Pagination";
import ControlBox from "@/src/components/event/ControlBox";
import FilteredEventList from "@/src/components/event/FilteredEventList";
import { Cookie } from "@/src/utils/store/cookieAdapter";
import { Token } from "@/src/utils/token/token";

export default async function Event({
  searchParams: query,
}: {
  searchParams: Record<string, any>;
}) {
  const { allToken } = new Token(new Cookie());
  let apiQuery = query.pageIndex ? query : { ...query, pageIndex: 1 };
  const rs = await getFilteredEvents(apiQuery, allToken);

  const hasEvents = rs.payload.events.length > 0;
  const hasPage = rs.payload.totalPage >= (query.pageIndex || 1);

  return (
    <main className="w-full max-w-[1200px] flex flex-col items-center gap-8 px-4">
      <ControlBox query={query} />
      {hasEvents && hasPage ? (
        <>
          <FilteredEventList events={rs.payload.events} />
          <Pagination query={query} totalPage={rs.payload.totalPage} />
        </>
      ) : (
        <div>이벤트 정보가 없습니다.</div>
      )}
    </main>
  );
}
