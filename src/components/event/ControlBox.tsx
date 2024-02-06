"use client";

import { objectToQueryString } from "@/src/utils/common/objectController";
import {
  CATEGORY,
  IS_FREE,
  LOCATION,
  ORDER_BY,
} from "@/src/utils/data/eventFilter";
import { useRouter } from "next/navigation";

const { name: locationName, options: locationOptions } = LOCATION;
const { name: categoryName, options: categoryOptions } = CATEGORY;
const { name: isFreeName, options: isFreeOptions } = IS_FREE;
const { name: orderByName, options: orderByOptions } = ORDER_BY;

const SELECT_STYLE = `w-full h-full px-4 py-2 rounded-md bg-slate-100`;

const ControlBox = ({ query }: { query: Record<string, any> }) => {
  const router = useRouter();

  const onFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const clearQuery = cleanQuery({ ...query, [name]: value });
    router.push(`/event?${objectToQueryString(clearQuery, "&")}`);
  };

  return (
    <section className="w-full">
      <div className="flex lg:flex-row flex-col gap-5 my-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <select
            onChange={(e) => onFilterChange(e)}
            name={locationName}
            className={SELECT_STYLE}
            // value={filter.location || locationOptions[0].text}
            // value={filter.location || locationOptions[0].text}
            value={query[locationName] || locationOptions[0].text}
          >
            {locationOptions.map((it) => (
              <option key={it.text} value={it.value}>
                {it.text}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => onFilterChange(e)}
            name={categoryName}
            className={SELECT_STYLE}
            // value={filter.category || categoryOptions[0].text}
            value={query[categoryName] || categoryOptions[0].text}
          >
            {categoryOptions.map((it) => (
              <option key={it.text} value={it.value}>
                {it.text}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => onFilterChange(e)}
            name={isFreeName}
            className={SELECT_STYLE}
            // value={filter.isFree || isFreeOptions[0].text}
            value={query[isFreeName] || categoryOptions[0].text}
          >
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
            onChange={(e) => onFilterChange(e)}
            value={query.start || ""}
            className={SELECT_STYLE}
          />
          <div>-</div>
          <input
            type="date"
            name="end"
            onChange={(e) => onFilterChange(e)}
            value={query.end || ""}
            className={SELECT_STYLE}
          />
        </div>

        <div className="">
          <select
            onChange={(e) => onFilterChange(e)}
            name={orderByName}
            className={SELECT_STYLE}
            // value={filter.orderBy || orderByOptions[0].text}
            value={query[orderByName] || categoryOptions[0].text}
          >
            {orderByOptions.map((it) => (
              <option key={it.text} value={it.value}>
                {it.text}
              </option>
            ))}
          </select>
        </div>
        <input
          name="keyword"
          onChange={(e) => onFilterChange(e)}
          placeholder="검색어를 입력하세요"
          className="px-4 py-2 rounded-md border"
        />
      </div>
      <div></div>
    </section>
  );
};

// 객체의 value가 "" | undefined | null 이면 제거하는 함수
function cleanQuery(query: Record<string, any>): Record<string, any> {
  const cleanedQuery: Record<string, any> = {};
  Object.keys(query).forEach((key) => {
    if (query[key] !== "") {
      cleanedQuery[key] = query[key];
    }
  });
  return cleanedQuery;
}

export default ControlBox;
