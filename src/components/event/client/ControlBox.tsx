"use client";

import { useContext } from "react";
import { FilterContext } from "../../../context/FilterContext";

const LOCATION = [
  { text: "지역구", value: "" },
  { text: "강남구", value: "강남구" },
  { text: "강동구", value: "강동구" },
  { text: "강북구", value: "강북구" },
  { text: "강서구", value: "강서구" },
  { text: "관악구", value: "관악구" },
  { text: "광진구", value: "광진구" },
  { text: "구로구", value: "구로구" },
  { text: "금천구", value: "금천구" },
  { text: "노원구", value: "노원구" },
  { text: "도봉구", value: "도봉구" },
  { text: "동대문구", value: "동대문구" },
  { text: "동작구", value: "동작구" },
  { text: "마포구", value: "마포구" },
  { text: "서대문구", value: "서대문구" },
  { text: "서초구", value: "서초구" },
  { text: "성동구", value: "성동구" },
  { text: "성북구", value: "성북구" },
  { text: "송파구", value: "송파구" },
  { text: "양천구", value: "양천구" },
];
const COST = [
  { text: "비용", value: "" },
  { text: "무료", value: "무료" },
  { text: "유료", value: "유료" },
];
const CATEGORY = [
  { text: "카테고리", value: "" },
  { text: "콘서트", value: "콘서트" },
  { text: "클래식", value: "클래식" },
  { text: "뮤지컬/오페라", value: "뮤지컬/오페라" },
  { text: "연극", value: "연극" },
  { text: "무용", value: "무용" },
  { text: "국악", value: "국악" },
  { text: "독주/독창회", value: "독주/독창회" },
  { text: "전시/미술", value: "전시/미술" },
  { text: "축제-기타", value: "축제-기타" },
  { text: "축제-문화/예술", value: "축제-문화/예술" },
  { text: "축제-자연/경관", value: "축제-자연/경관" },
  { text: "축제-전통/역사", value: "축제-전통/역사" },
  { text: "축제-시민화합", value: "축제-시민화합" },
  { text: "교축/체험", value: "교축/체험" },
  { text: "기타", value: "기타" },
];
const ORDER_BY = [
  { text: "빠른 시작일 순", value: "" },
  { text: "곧 시작할 순", value: "latest" },
  { text: "인기 순", value: "likes" },
  { text: "조회 순", value: "views" },
];

const SELECT_STYLE = `w-full h-full px-4 py-2 rounded-md bg-slate-100`;

const ControlBox = () => {
  const { filter, onFilterChange } = useContext(FilterContext);

  return (
    <section className="w-full h-full flex md:flex-row flex-col gap-5 justify-center my-5">
      <div className="flex gap-5">
        <select
          onChange={onFilterChange}
          name="location"
          className={SELECT_STYLE}
          value={filter.location}
        >
          {LOCATION.map((it) => (
            <option key={it.text} value={it.value}>
              {it.text}
            </option>
          ))}
        </select>
        <select
          onChange={onFilterChange}
          name="category"
          className={SELECT_STYLE}
          value={filter.category}
        >
          {CATEGORY.map((it) => (
            <option key={it.text} value={it.value}>
              {it.text}
            </option>
          ))}
        </select>
        <select
          onChange={onFilterChange}
          name="cost"
          className={SELECT_STYLE}
          value={filter.cost}
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
          name="startDate"
          onChange={onFilterChange}
          value={filter.startDate}
          className={SELECT_STYLE}
        />
        <div>-</div>
        <input
          type="date"
          name="endDate"
          onChange={onFilterChange}
          value={filter.endDate}
          className={SELECT_STYLE}
        />
      </div>

      <div className="">
        <select
          onChange={onFilterChange}
          name="orderBy"
          className={SELECT_STYLE}
          value={filter.orderBy}
        >
          {ORDER_BY.map((it) => (
            <option key={it.text} value={it.value}>
              {it.text}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default ControlBox;
