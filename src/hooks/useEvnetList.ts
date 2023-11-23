import { useEffect, useState } from "react";
import { getFilteredEvents } from "../apis/event/v2";
import { SimpleEventListWithPagination } from "../types/events";
import { Filter } from "./useFilter";

const PAGE_PER_SIZE = 16;

const useEventList = (filter: Filter) => {
  const [events, setEvents] = useState<SimpleEventListWithPagination>({
    events: [],
    totalPage: 0,
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pagingGroupIndex: 0,
  });

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0, pagingGroupIndex: 0 }));
  }, [filter]);

  useEffect(() => {
    const fetchingData = async () => {
      const { location, category, cost, startDate, endDate, orderBy } = filter;
      const data = await getFilteredEvents(
        location,
        category,
        cost,
        startDate,
        endDate,
        orderBy,
        pagination.pageIndex,
        PAGE_PER_SIZE
      );

      if (data) {
        setEvents(data);
      }
    };
    fetchingData();
  }, [pagination]);

  return {
    events,
    pagination,
    setPagination,
  };
};

export default useEventList;
