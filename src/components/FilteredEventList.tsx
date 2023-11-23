"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ControlBox from "./ControlBox";
import EventList from "./EventList";
import MapList from "./MapList";
import Button from "./common/Button";

export type Filter = {
  location: string;
  category: string;
  cost: string;
  startDate: string;
  endDate: string;
  orderBy: string;
};

const TAB_LIST = [
  { text: "리스트로보기", isListMode: true },
  { text: "지도로보기", isListMode: false },
];

const FilteredEventList = () => {
  const router = useRouter();
  const query = useSearchParams().get("orderBy");

  const [filter, setFilter] = useState<Filter>({
    location: "",
    category: "",
    cost: "",
    startDate: "",
    endDate: "",
    orderBy: query ? query : "",
  });

  const [isListMode, setIsListMode] = useState(TAB_LIST[0].isListMode);

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
      <section className="w-full flex flex-col py-5 gap-5">
        <div className="w-full flex gap-5 justify-start border-b-4 pb-2">
          {TAB_LIST.map((it) => (
            <Button
              key={it.text}
              onClick={() => setIsListMode(it.isListMode)}
              size={`${it.isListMode === isListMode ? "md" : "sm"}`}
              color={`${it.isListMode === isListMode ? "dark" : "light"}`}
            >
              {it.text}
            </Button>
          ))}
        </div>
        {isListMode && <EventList filter={{ ...filter }} />}
        {!isListMode && <MapList filter={{ ...filter }} />}
      </section>
    </>
  );
};

export default FilteredEventList;
