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
          <select
            onChange={onFilterChange}
            name="location"
            className={SELECT_STYLE}
            value={query[locationName] || locationOptions[0].text}>
            {locationOptions.map((it) => (
              <option key={it.text} value={it.value}>
                {it.text}
              </option>
            ))}
          </select>
          <select
            onChange={onFilterChange}
            name="category"
            className={SELECT_STYLE}
            value={query[categoryName] || categoryOptions[0].text}>
            {categoryOptions.map((it) => (
              <option key={it.text} value={it.value}>
                {it.text}
              </option>
            ))}
          </select>
          <select
            onChange={onFilterChange}
            name="isFree"
            className={SELECT_STYLE}
            value={query[isFreeName] || categoryOptions[0].text}>
            {isFreeOptions.map((it) => (
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
            onChange={onFilterChange}
            value={""}
            className={SELECT_STYLE}
          />
          <div>-</div>
          <input
            type="date"
            name="end"
            onChange={onFilterChange}
            value={query.start || ""}
            className={SELECT_STYLE}
          />
        </div>

        <div className="">
          <select
            onChange={onFilterChange}
            name="orderBy"
            className={SELECT_STYLE}
            value={query.end || categoryOptions[0].text}>
            {orderByOptions.map((it) => (
              <option key={it.text} value={it.value}>
                {it.text}
              </option>
            ))}
          </select>
        </div>
        <input
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

export default ControlBox;
