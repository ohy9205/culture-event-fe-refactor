"use client";

import useEventFilter from "@/src/hooks/useEventFilter";
import usePagination from "@/src/hooks/usePagination";
import { objectToQueryString } from "@/src/utils/common/objectController";
import { evnetFilter } from "@/src/utils/data/eventFilter";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect } from "react";

const LOCATION = evnetFilter.location.options;
const COST = evnetFilter.isFree.options;
const CATEGORY = evnetFilter.category.options;
const ORDER_BY = evnetFilter.orderBy.options;

const SELECT_STYLE = `w-full h-full px-4 py-2 rounded-md bg-slate-100`;

const ControlBox = () => {
  const { filter, onFilterChange } = useEventFilter();
  const {
    onInitPagingHandler,
    data: { pageIndex },
  } = usePagination();
  const router = useRouter();

  const changeFilter = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    onFilterChange(e);
  };

  useEffect(() => {
    console.log("controlBox");
    const query = objectToQueryString(filter, "&");
    router.push(`/event?${query}`);
  }, [filter]);

  return (
    <section className="w-full">
      <div className="flex lg:flex-row flex-col gap-5 my-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <select
            onChange={changeFilter}
            name="location"
            className={SELECT_STYLE}
            value={filter.location || LOCATION[0].text}
          >
            {LOCATION.map((it) => (
              <option key={it.text} value={it.value}>
                {it.text}
              </option>
            ))}
          </select>
          <select
            onChange={changeFilter}
            name="category"
            className={SELECT_STYLE}
            value={filter.category || CATEGORY[0].text}
          >
            {CATEGORY.map((it) => (
              <option key={it.text} value={it.value}>
                {it.text}
              </option>
            ))}
          </select>
          <select
            onChange={changeFilter}
            name="isFree"
            className={SELECT_STYLE}
            value={filter.isFree || COST[0].text}
          >
            {COST.map((it) => (
              <option key={it.text} value={it.value}>
                {it.text}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="date"
            name="start"
            onChange={changeFilter}
            value={filter.start || ""}
            className={SELECT_STYLE}
          />
          <div>-</div>
          <input
            type="date"
            name="end"
            onChange={changeFilter}
            value={filter.end || ""}
            className={SELECT_STYLE}
          />
        </div>

        <div className="">
          <select
            onChange={changeFilter}
            name="orderBy"
            className={SELECT_STYLE}
            value={filter.orderBy || ORDER_BY[0].text}
          >
            {ORDER_BY.map((it) => (
              <option key={it.text} value={it.value}>
                {it.text}
              </option>
            ))}
          </select>
        </div>
        <input
          name="keyword"
          onChange={changeFilter}
          placeholder="검색어를 입력하세요"
          className="px-4 py-2 rounded-md border"
        />
      </div>
      <div></div>
    </section>
  );
};

export default ControlBox;
