"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ControlBox from "./ControlBox";
import EventList from "./EventList";
import MapList from "./MapList";
import Pagination from "./Pagination";
import Button from "./common/Button";
import { FilterProvider } from "../context/FilterContext";
import { PaginationProvider } from "../context/PaginationContext";

const TAB_LIST = [
  { text: "리스트로보기", isListMode: true },
  { text: "지도로보기", isListMode: false },
];

const FilteredEventList = () => {
  const query = useSearchParams().get("orderBy") || "";
  const router = useRouter();
  const [isListMode, setIsListMode] = useState(TAB_LIST[0].isListMode);

  useEffect(() => {
    if (query) {
      router.replace("/event");
    }
  }, [query]);

  return (
    <FilterProvider query={query}>
      <ControlBox />
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

        {isListMode && (
          <PaginationProvider>
            <EventList />
            <Pagination />
          </PaginationProvider>
        )}
        {!isListMode && <MapList />}
      </section>
    </FilterProvider>
  );
};

export default FilteredEventList;
