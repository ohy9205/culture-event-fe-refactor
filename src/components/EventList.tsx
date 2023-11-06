import { useState, useEffect } from "react";
import { getFilteredEvents } from "../utils/events";
import GridContainer from "./GridContainer";
import { SimpleEvent } from "../types/events";
import ToggleModalCard from "./ToggleModalCard";
import EventCard from "./EventCard";
import { Filter } from "./FilteredEventList";

type Props = {
  filter: Filter;
};

const EventList = ({ filter }: Props) => {
  const [events, setEvents] = useState<SimpleEvent[]>([]);

  useEffect(() => {
    const { location, category, cost, startDate, endDate, orderBy, latest } =
      filter;
    const fetchingData = async () => {
      const data = await getFilteredEvents(
        location,
        category,
        cost,
        startDate,
        endDate,
        orderBy,
        latest
      );

      if (data) {
        setEvents(data);
      }
    };

    fetchingData();
  }, [filter]);

  return (
    <div>
      <GridContainer>
        {events.map((event) => (
          <ToggleModalCard id={event.id.toString()} key={event.id}>
            <EventCard event={event} />
          </ToggleModalCard>
        ))}
      </GridContainer>
    </div>
  );
};

export default EventList;
