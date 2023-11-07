"use client";

import { useState } from "react";
import ControlBox from "./ControlBox";
import EventList from "./EventList";
import { useSearchParams } from "next/navigation";

export type Filter = {
  location: string;
  category: string;
  cost: string;
  startDate: string;
  endDate: string;
  orderBy: string;
};

const FilteredEventList = () => {
  const params = useSearchParams();

  const [filter, setFilter] = useState<Filter>({
    location: "지역구",
    category: "카테고리",
    cost: "비용",
    startDate: "",
    endDate: "",
    orderBy: "",
  });

  const onfiltersChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <ControlBox onFilterChange={onfiltersChange} />
      <EventList filter={{ ...filter }} />
    </>
  );
};

export default FilteredEventList;
