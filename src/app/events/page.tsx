import ControlBox from "@/src/components/ControlBox";
import FilteredEventList from "@/src/components/FilteredEventList";
import React from "react";

export default async function Events() {
  return (
    <main>
      <ControlBox />
      <FilteredEventList />
    </main>
  );
}
