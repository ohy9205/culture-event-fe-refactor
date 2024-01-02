"use client";

import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FilterProvider } from "../../../context/FilterContext";
import { PaginationProvider } from "../../../context/PaginationContext";
import Button from "../../UI/common/Button";
import ControlBox from "./ControlBox";
import MapList from "./MapList";
import PosterList from "./PosterList";

const TAB_LIST = [
  { text: "리스트로보기", isPosterMode: true },
  { text: "지도로보기", isPosterMode: false },
];

const FilteredEventList = () => {
  const query = useSearchParams().get("orderBy") || "";
  const router = useRouter();
  const [isPosterMode, setIsPosterMode] = useState(TAB_LIST[0].isPosterMode);
  const {
    state: { isLoggedIn },
  } = useAuthContext();

  useEffect(() => {
    if (isLoggedIn !== undefined && !isLoggedIn) {
      alert("로그인이 필요한 페이지입니다.");
      router.push("/signin");
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn && (
        <FilterProvider query={query}>
          <>
            <ControlBox />
            <section className="w-full flex flex-col py-5 gap-5">
              <div className="w-full flex gap-5 justify-start border-b-4 pb-2">
                {TAB_LIST.map((it) => (
                  <Button
                    key={it.text}
                    onClick={() => setIsPosterMode(it.isPosterMode)}
                    size={`${it.isPosterMode === isPosterMode ? "md" : "sm"}`}
                    color={`${
                      it.isPosterMode === isPosterMode ? "dark" : "light"
                    }`}
                  >
                    {it.text}
                  </Button>
                ))}
              </div>

              {isPosterMode && (
                <PaginationProvider>
                  <PosterList />
                </PaginationProvider>
              )}
              {!isPosterMode && <MapList />}
            </section>
          </>
        </FilterProvider>
      )}
    </>
  );
};

export default FilteredEventList;
