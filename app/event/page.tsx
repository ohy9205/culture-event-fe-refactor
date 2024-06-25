import { ControlBox } from "@/src/entities/eventFilter";
import { FilteredEventList, getFilteredEvents } from "@/src/entities/eventList";
import { Pagination } from "@/src/shared/components";
import { Cookie } from "@/src/shared/store";
import { Token } from "@/src/shared/token";

type Props = {
  searchParams: Record<string, any>;
};

const Event = async ({ searchParams: query }: Props) => {
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
};

export default Event;
