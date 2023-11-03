import { useState, useEffect } from "react";
import { getFilteredEvents } from "../utils/events";
import GridContainer from "./GridContainer";
import { Event } from "../types/events";

type Props = {
  filters: {
    location: string;
    category: string;
    cost: string;
    startDate: string;
    endDate: string;
  };
};

const EventList = ({ filters }: Props) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const { location, category, cost, startDate, endDate } = filters;
    const fetchingData = async () => {
      const data = await getFilteredEvents(
        location,
        category,
        cost,
        startDate,
        endDate
      );

      if (data) {
        setEvents(data);
      }
    };

    fetchingData();
  }, [filters]);

  return (
    <div>
      <GridContainer>
        {events.map((event) => (
          <div key={event.id}>{event.title}</div>
        ))}
      </GridContainer>
    </div>
  );
};

export default EventList;
