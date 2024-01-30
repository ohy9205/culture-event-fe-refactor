"use client";

import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { deleteObjectKeys } from "../utils/objectController/object";

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
  location: undefined,
  category: undefined,
  isFree: undefined,
  start: undefined,
  end: undefined,
  orderBy: undefined,
  keyword: undefined,
};

export const FilterContext = createContext({
  filter: initialFilter,
  onFilterChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {},
  setFilter: (filter: Filter) => {},
});

export const FilterProvider = ({ children, query }: Props) => {
  const [filter, setFilter] = useState<Record<string, any>>(query);
  const router = useRouter();

  const debounceValue = useDebounce(filter, 200);

  const onFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (value) {
      setFilter((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const newFilter = deleteObjectKeys(filter, [name]);
      setFilter(newFilter);
    }
  };

  return (
    <FilterContext.Provider
      value={{
        filter: debounceValue,
        setFilter,
        onFilterChange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
