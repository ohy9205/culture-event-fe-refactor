"use client";

import { useState } from "react";
import ControlBox from "./ControlBox";
import EventList from "./EventList";

const FilteredEventList = () => {
  const [filters, setFilters] = useState({
    location: "",
    category: "",
    cost: "",
    startDate: "",
    endDate: "",
  });

  const onfiltersChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <ControlBox onFilterChange={onfiltersChange} />
      <EventList filters={{ ...filters }} />
    </>
  );
};

export default FilteredEventList;
