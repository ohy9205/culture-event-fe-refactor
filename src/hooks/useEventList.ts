import { useContext, useEffect, useState } from "react";
import { responseHandler } from "../apis/common/commonAPIFetch";
import { getFilteredEvents } from "../apis/event/v2";
import { FilterContext } from "../context/FilterContext";
import { PaginationContext } from "../context/PaginationContext";
import { SimpleEventListWithPagination } from "./../types/events";

const PAGE_PER_SIZE = 16;

const useEventList = () => {
  const { filter } = useContext(FilterContext);
  const { pagination, onInitPagingHandler } = useContext(PaginationContext);
  const [events, setEvents] = useState<SimpleEventListWithPagination>({
    events: [],
    totalPage: 0,
  });

  useEffect(() => {
    onInitPagingHandler();
  }, [filter]);

  useEffect(() => {
    const fetchingData = async () => {
      const { location, category, cost, startDate, endDate, orderBy, keyword } =
        filter;

      const rs = await getFilteredEvents(
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

      if (rs) {
        const handler = {
          success: () => {
            setEvents(rs.payload);
          },
        };
        responseHandler(rs, handler);
      }
    };

    fetchingData();
  }, [pagination, filter]);

  return {
    events,
  };
};

export default useEventList;
