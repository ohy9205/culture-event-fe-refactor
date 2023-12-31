import { createContext, useState } from "react";
import useDebounce from "../hooks/useDebounce";

type Props = {
  query: string;
  children: React.ReactNode;
};

export type Filter = {
  location: string;
  category: string;
  cost: string;
  startDate: string;
  endDate: string;
  orderBy: string;
  keyword: string;
};

export const initialFilter = {
  location: "",
  category: "",
  cost: "",
  startDate: "",
  endDate: "",
  orderBy: "",
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
  const [filter, setFilter] = useState<Filter>({
    location: "",
    category: "",
    cost: "",
    startDate: "",
    endDate: "",
    orderBy: query ? query : "",
    keyword: "",
  });

  const debounceValue = useDebounce(filter, 200);

  const onFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFilter((prev: Filter) => ({
      ...prev,
      [name]: value,
    }));
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
