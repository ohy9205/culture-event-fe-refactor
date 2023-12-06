import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { getFilteredEvents } from "../apis/event/v2";
import { FilterContext } from "../context/FilterContext";
import { PaginationContext } from "../context/PaginationContext";
import { SimpleEventListWithPagination } from "./../types/events";

const PAGE_PER_SIZE = 16;

const useEventList = () => {
  const router = useRouter();
  const { filter } = useContext(FilterContext);
  const { pagination, onInitPagingHandler } = useContext(PaginationContext);
  const [events, setEvents] = useState<SimpleEventListWithPagination>({
    events: [],
    totalPage: 0,
  });

  const responseHandler = (
    status: number,
    events: SimpleEventListWithPagination
  ) => {
    if (status === 200) {
      setEvents(events);
    } else if (status !== 401) {
      router.push(`/error/${status}`);
    }
  };

  useEffect(() => {
    onInitPagingHandler();
  }, [filter]);

  useEffect(() => {
    const fetchingData = async () => {
      const { location, category, cost, startDate, endDate, orderBy, keyword } =
        filter;

      const data = await getFilteredEvents(
        location,
        category,
        cost,
        startDate,
        endDate,
        orderBy,
        keyword,
        pagination.pageIndex,
        PAGE_PER_SIZE
      );

      if (data) {
        responseHandler(data.status, data.payload);
      }
    };

    fetchingData();
  }, [pagination, filter]);

  return {
    events,
  };
};

export default useEventList;
