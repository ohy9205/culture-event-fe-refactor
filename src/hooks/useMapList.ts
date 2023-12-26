import { useContext, useEffect, useState } from "react";
import { responseHandler } from "../apis/common/commonAPIFetch";
import { getFilteredEvents } from "../apis/event/v2";
import { FilterContext } from "../context/FilterContext";
import { SimpleEvent } from "../types/events";

const useMapList = () => {
  const { filter } = useContext(FilterContext);
  const [events, setEvents] = useState<SimpleEvent[]>([]);
  const [curEvent, setCurEvent] = useState<SimpleEvent>();

  // 필터변경시
  useEffect(() => {
    const fetchingData = async () => {
      const rs = await getFilteredEvents(filter);

      if (rs) {
        const handler = {
          success: () => {
            setEvents(rs.payload.events);
            setCurEvent(rs.payload.events[0]);
          },
        };
        responseHandler(rs, handler);
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
