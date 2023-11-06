import FilteredEventList from "@/src/components/FilteredEventList";
import React from "react";

export default async function Event() {
  return (
    <main className="max-w-[1200px] flex flex-col items-center">
      <FilteredEventList />
    </main>
  );
}
