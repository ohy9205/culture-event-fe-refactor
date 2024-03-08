"use client";

import useEventFilter from "@/src/hooks/useEventFilter";
import {
  CATEGORY,
  IS_FREE,
  LOCATION,
  ORDER_BY,
} from "@/src/utils/data/eventFilter";

const { name: locationName, options: locationOptions } = LOCATION;
const { name: categoryName, options: categoryOptions } = CATEGORY;
const { name: isFreeName, options: isFreeOptions } = IS_FREE;
const { name: orderByName, options: orderByOptions } = ORDER_BY;

const SELECT_STYLE = `w-full h-full px-4 py-2 rounded-md bg-slate-100`;

const ControlBox = ({ query }: { query: Record<string, any> }) => {
  const { onFilterChange } = useEventFilter(query);

  return (
    <section className="w-full">
      <div className="flex lg:flex-row flex-col gap-5 my-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <label htmlFor="location" className="sr-only">
            지역구
          </label>
          <select
            onChange={onFilterChange}
            name="location"
            id="location"
            className={SELECT_STYLE}
            value={query[locationName] || locationOptions[0].text}>
            {locationOptions.map((it) => (
              <option key={it.text} value={it.value}>
                {it.text}
              </option>
            ))}
          </select>
          <label htmlFor="category" className="sr-only">
            분야 카테고리
          </label>
          <select
            onChange={onFilterChange}
            name="category"
            id="category"
            className={SELECT_STYLE}
            value={query[categoryName] || categoryOptions[0].text}>
            {categoryOptions.map((it) => (
              <option key={it.text} value={it.value}>
                {it.text}
              </option>
            ))}
          </select>
          <label htmlFor="isFree" className="sr-only">
            비용
          </label>
          <select
            onChange={onFilterChange}
            name="isFree"
            id="isFree"
            className={SELECT_STYLE}
            value={query[isFreeName] || isFreeOptions[0].text}>
            {isFreeOptions.map((it) => (
              <option key={it.text} value={it.value}>
                {it.text}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="start" className="sr-only">
            시작일
          </label>
          <input
            type="date"
            name="start"
            id="start"
            onChange={onFilterChange}
            value={query.start || ""}
            className={SELECT_STYLE}
          />
          <div>-</div>
          <label htmlFor="end" className="sr-only">
            종료일
          </label>
          <input
            type="date"
            name="end"
            id="end"
            onChange={onFilterChange}
            value={query.end || ""}
            className={SELECT_STYLE}
            min={query.start || getTodayDate()}
          />
        </div>

        <div className="">
          <label htmlFor="orderBy" className="sr-only">
            정렬
          </label>
          <select
            onChange={onFilterChange}
            name="orderBy"
            id="orderBy"
            className={SELECT_STYLE}
            value={query[orderByName] || orderByOptions[0].text}>
            {orderByOptions.map((it) => (
              <option key={it.text} value={it.value}>
                {it.text}
              </option>
            ))}
          </select>
        </div>
        <input
          type="search"
          name="keyword"
          onChange={onFilterChange}
          placeholder="검색어를 입력하세요"
          className="px-4 py-2 rounded-md border"
        />
      </div>
      <div></div>
    </section>
  );
};

const getTodayDate = () => {
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0");
  const day = String(todayDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default ControlBox;
