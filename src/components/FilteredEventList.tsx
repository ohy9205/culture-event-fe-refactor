"use client";

import { useEffect, useState } from "react";
import ControlBox from "./ControlBox";
import EventList from "./EventList";
import { useRouter, useSearchParams } from "next/navigation";

export type Filter = {
  location: string;
  category: string;
  cost: string;
  startDate: string;
  endDate: string;
  orderBy: string;
};

const FilteredEventList = () => {
  const router = useRouter();
  const query = useSearchParams().get("orderBy");

  const [filter, setFilter] = useState<Filter>({
    location: "지역구",
    category: "카테고리",
    cost: "비용",
    startDate: "",
    endDate: "",
    orderBy: query ? query : "",
  });

  useEffect(() => {
    if (query) {
      router.push("/event");
    }
  }, [query, router]);

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
      <ControlBox onFilterChange={onfiltersChange} filter={{ ...filter }} />
      <EventList filter={{ ...filter }} />
    </>
  );
};

export default FilteredEventList;
