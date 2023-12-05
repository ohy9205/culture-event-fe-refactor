import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { getFilteredEventsWithoutPagination } from "../apis/event/v2";
import { FilterContext } from "../context/FilterContext";
import { SimpleEvent } from "../types/events";

const useMapList = () => {
  const router = useRouter();
  const { filter } = useContext(FilterContext);
  const [events, setEvents] = useState<SimpleEvent[]>([]);
  const [curEvent, setCurEvent] = useState<SimpleEvent>();

  const responseHandler = (status: number, events: SimpleEvent[]) => {
    if (status === 200) {
      setEvents(events);
      setCurEvent(events[0]);
    } else {
      router.push(`/error/${status}`);
    }
  };

  // 필터변경시
  useEffect(() => {
    const fetchingData = async () => {
      const { location, category, cost, startDate, endDate, orderBy, keyword } =
        filter;
      const data = await getFilteredEventsWithoutPagination(
        location,
        category,
        cost,
        startDate,
        endDate,
        orderBy,
        keyword
      );

      if (data) {
        responseHandler(data.status, data.payload.events);
      }
    };
    fetchingData();
  }, [filter]);

  return {
    events,
    curEvent,
    setCurEvent,
  };
};

export default useMapList;
