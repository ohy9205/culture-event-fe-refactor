"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { objectToQueryString } from "../utils/common/objectController";
import {
  CATEGORY,
  IS_FREE,
  LOCATION,
  ORDER_BY,
} from "../utils/data/eventFilter";

type Props = {
  query: Record<string, any>;
  children: React.ReactNode;
};

export type Filter = {
  location?: string;
  category?: string;
  isFree?: string;
  start?: string;
  end?: string;
  orderBy?: string;
  keyword?: string;
};

export const initialFilter = {
  location: LOCATION.name,
  category: CATEGORY.name,
  isFree: IS_FREE.name,
  start: undefined,
  end: undefined,
  orderBy: ORDER_BY.name,
  keyword: "",
};

export const FilterContext = createContext({
  filter: initialFilter,
  onFilterChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {},
  setFilter: (filter: Filter) => {},
});

export const FilterProvider = ({ children, query }: Props) => {
  console.log(query);
  const [filter, setFilter] = useState<Filter | any>(query);
  const router = useRouter();
  const params = useSearchParams();
  const queryParams = Object.fromEntries(new URLSearchParams(params));

  const debounceValue = useDebounce(filter, 2000);

  const onFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (params.has(name)) {
      const newQuery = objectToQueryString(
        { ...queryParams, [name]: value },
        "&"
      );
      console.log(newQuery);
      router.push(`/event?${newQuery}`);
    } else {
      // 기존 쿼리에 해당 값이 없으면 새로 추가
      const newQuery = objectToQueryString(
        { ...queryParams, [name]: value },
        "&"
      );
      console.log(newQuery);
      router.push(`/event?${newQuery}`);
    }
  };

  console.log("useEEEEE");

  return (
    <FilterContext.Provider
      value={{
        filter: filter,
        setFilter,
        onFilterChange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
