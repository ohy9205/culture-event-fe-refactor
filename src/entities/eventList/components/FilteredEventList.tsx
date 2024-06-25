"use client";

import { Button } from "@/src/shared/components";
import { useState } from "react";
import { SimpleEvent } from "../types";
import MapList from "./MapList";
import PosterList from "./PosterList";

type Props = {
  events: SimpleEvent[];
};

const TAB_LIST = [
  { text: "포스터뷰", value: "poster" },
  { text: "지도뷰", value: "map" },
];

const FilteredEventList = ({ events }: Props) => {
  const [curTab, setCurTab] = useState("poster");

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-4">
        {TAB_LIST.map((tab) => (
          <Button
            key={tab.text}
            color={curTab === tab.value ? "dark" : "light"}
            size="md"
            onClick={() => {
              setCurTab(tab.value);
            }}>
            {tab.text}
          </Button>
        ))}
      </div>
      {curTab === "poster" && <PosterList list={events} />}
      {curTab === "map" && <MapList list={events} />}
    </div>
  );
};

export default FilteredEventList;
