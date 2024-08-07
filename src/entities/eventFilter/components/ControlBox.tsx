"use client";

import { Select } from "@/src/shared/components";
import { CATEGORY, IS_FREE, LOCATION, ORDER_BY } from "../consts";
import useEventFilter from "../hooks/useEventFilter";

type Props = { query: Record<string, any> };

const { name: locationName, options: locationOptions } = LOCATION;
const { name: categoryName, options: categoryOptions } = CATEGORY;
const { name: isFreeName, options: isFreeOptions } = IS_FREE;
const { name: orderByName, options: orderByOptions } = ORDER_BY;

const SELECT_STYLE = `w-full h-full px-4 py-2 rounded-md bg-slate-100`;

const ControlBox = ({ query }: Props) => {
  const { onFilterChange } = useEventFilter(query);

  return (
    <section className="w-full">
      <div className="flex lg:flex-row flex-col gap-5 my-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <label htmlFor="location" className="sr-only">
            지역구
          </label>
          <Select
            name="location"
            onChange={onFilterChange}
            value={query[locationName] || locationOptions[0].text}
            data-testid="location-select">
            {locationOptions.map((it) => (
              <Select.Option key={it.text} text={it.text} value={it.value} />
            ))}
          </Select>
          <label htmlFor="category" className="sr-only">
            분야 카테고리
          </label>
          <Select
            name="category"
            onChange={onFilterChange}
            value={query[categoryName] || categoryOptions[0].text}>
            {categoryOptions.map((it) => (
              <Select.Option key={it.text} text={it.text} value={it.value} />
            ))}
          </Select>
          <label htmlFor="isFree" className="sr-only">
            비용
          </label>
          <Select
            onChange={onFilterChange}
            name="isFree"
            value={query[isFreeName] || isFreeOptions[0].text}>
            {isFreeOptions.map((it) => (
              <Select.Option key={it.text} text={it.text} value={it.value} />
            ))}
          </Select>
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
            data-testid="start-filter"
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
            data-testid="end-filter"
          />
        </div>

        <div className="">
          <label htmlFor="orderBy" className="sr-only">
            정렬
          </label>
          <Select
            onChange={onFilterChange}
            name="orderBy"
            value={query[orderByName] || orderByOptions[0].text}>
            {orderByOptions.map((it) => (
              <Select.Option key={it.text} text={it.text} value={it.value} />
            ))}
          </Select>
        </div>
        <input
          type="search"
          name="keyword"
          onChange={onFilterChange}
          placeholder="검색어를 입력하세요"
          className="px-4 py-2 rounded-md border"
          defaultValue={query.keyword}
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
