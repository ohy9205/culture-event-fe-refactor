"use client";

type Props = {
  onFilterChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
};

const LOCATION = [
  "지역구",
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
];
const COST = ["비용", "무료", "유료"];
const CATEGORY = [
  "카테고리",
  "콘서트",
  "클래식",
  "뮤지컬/오페라",
  "연극",
  "무용",
  "국악",
  "독주/독창회",
  "전시/미술",
  "축제-기타",
  "축제-문화/예술",
  "축제-자연/경관",
  "축제-전통/역사",
  "축제-시민화합",
  "교축/체험",
  "기타",
];
const ORDER_BY = [
  { text: "빠른 시작일 순", value: "" },
  { text: "곧 시작할 순", value: "latest" },
  { text: "조회 순", value: "views" },
];

const SELECT_STYLE = `px-4 py-2 rounded-md bg-slate-100`;

const ControlBox = ({ onFilterChange }: Props) => {
  return (
    <>
      <section className="flex gap-5">
        <div className="flex gap-5">
          <select
            onChange={onFilterChange}
            name="location"
            className={SELECT_STYLE}
          >
            {LOCATION.map((it) => (
              <option key={it}>{it}</option>
            ))}
          </select>
          <select
            onChange={onFilterChange}
            name="category"
            className={SELECT_STYLE}
          >
            {CATEGORY.map((it) => (
              <option key={it}>{it}</option>
            ))}
          </select>
          <select
            onChange={onFilterChange}
            name="cost"
            className={SELECT_STYLE}
          >
            {COST.map((it) => (
              <option key={it}>{it}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <input
            type="date"
            name="startDate"
            onChange={onFilterChange}
            className={SELECT_STYLE}
          />
          <div>-</div>
          <input
            type="date"
            name="endDate"
            onChange={onFilterChange}
            className={SELECT_STYLE}
          />
        </div>

        <select
          onChange={onFilterChange}
          name="orderBy"
          className={SELECT_STYLE}
        >
          {ORDER_BY.map((it) => (
            <option key={it.text} value={it.value}>
              {it.text}
            </option>
          ))}
        </select>
      </section>
    </>
  );
};

export default ControlBox;
