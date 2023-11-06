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

const ControlBox = ({ onFilterChange }: Props) => {
  return (
    <section>
      <select onChange={onFilterChange} name="location">
        {LOCATION.map((it) => (
          <option key={it}>{it}</option>
        ))}
      </select>
      <select onChange={onFilterChange} name="category">
        {CATEGORY.map((it) => (
          <option key={it}>{it}</option>
        ))}
      </select>
      <select onChange={onFilterChange} name="cost">
        {COST.map((it) => (
          <option key={it}>{it}</option>
        ))}
      </select>
      <input type="date" name="startDate" onChange={onFilterChange} />
      <input type="date" name="endDate" onChange={onFilterChange} />
    </section>
  );
};

export default ControlBox;
