import { useContext, useEffect, useState } from "react";
import { responseHandler } from "../apis/common/responseHandler";
import { getFilteredEvents } from "../apis/event/v2";
import { FilterContext } from "../context/FilterContext";
import { PaginationContext } from "../context/PaginationContext";
import { SimpleEventListWithPagination } from "../types/events";

const PAGE_PER_SIZE = 16;

const usePosterList = () => {
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
      const rs = await getFilteredEvents(filter, {
        pageIndex: pagination.pageIndex,
        pageSize: PAGE_PER_SIZE,
      });

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
    get: () => ({
      events: events.events,
      totalPage: events.totalPage,
    }),
  };
};

export default usePosterList;
