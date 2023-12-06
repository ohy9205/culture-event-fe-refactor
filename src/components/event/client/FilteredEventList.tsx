"use client";

import useUser from "@/src/hooks/useUser";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FilterProvider } from "../../../context/FilterContext";
import { PaginationProvider } from "../../../context/PaginationContext";
import Button from "../../UI/common/Button";
import ControlBox from "./ControlBox";
import EventList from "./EventList";
import MapList from "./MapList";
import Pagination from "./Pagination";

const TAB_LIST = [
  { text: "리스트로보기", isListMode: true },
  { text: "지도로보기", isListMode: false },
];

const FilteredEventList = () => {
  const query = useSearchParams().get("orderBy") || "";
  const router = useRouter();
  const { loggedOut, isLoading } = useUser();
  const [isListMode, setIsListMode] = useState(TAB_LIST[0].isListMode);

  useEffect(() => {
    if (!isLoading && loggedOut) {
      alert("로그인이 필요한 페이지입니다.");
      router.push("/signin");
    } else if (query) {
      router.push("/event");
    }
  }, [query, loggedOut, isLoading, router]);

  return (
    <FilterProvider query={query}>
      {!isLoading && !loggedOut && (
        <>
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
        </>
      )}
    </FilterProvider>
  );
};

export default FilteredEventList;
