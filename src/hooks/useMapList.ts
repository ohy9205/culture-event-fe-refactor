import { useContext, useEffect, useState } from "react";
import { getFilteredEventsWithoutPagination } from "../apis/event/v2";
import { FilterContext } from "../components/context/FilterContext";
import { SimpleEvent } from "../types/events";

const useMapList = () => {
  const { filter } = useContext(FilterContext);
  const [events, setEvents] = useState<SimpleEvent[]>([]);
  const [curEvent, setCurEvent] = useState<SimpleEvent>();

  // 필터변경시
  useEffect(() => {
    const fetchingData = async () => {
      const { location, category, cost, startDate, endDate, orderBy } = filter;
      const data = await getFilteredEventsWithoutPagination(
        location,
        category,
        cost,
        startDate,
        endDate,
        orderBy
      );
      if (data) {
        setEvents(data);
        setCurEvent(data[0]);
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
