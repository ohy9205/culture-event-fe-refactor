"use client";

import { useState } from "react";
import useFilter from "../hooks/useFilter";
import ControlBox from "./ControlBox";
import EventList from "./EventList";
import MapList from "./MapList";
import Button from "./common/Button";

const TAB_LIST = [
  { text: "리스트로보기", isListMode: true },
  { text: "지도로보기", isListMode: false },
];

const FilteredEventList = () => {
  const { filter, onFilterChange } = useFilter();
  const [isListMode, setIsListMode] = useState(TAB_LIST[0].isListMode);

  return (
    <>
      <ControlBox filter={filter} onFilterChange={onFilterChange} />
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
        {isListMode && <EventList filter={filter} />}
        {!isListMode && <MapList filter={filter} />}
      </section>
    </>
  );
};

export default FilteredEventList;
