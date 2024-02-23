import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { objectToQueryString } from "../utils/common/objectController";
import useDebounce from "./useDebounce";

const useEventFilter = (query: Record<string, any>) => {
  const router = useRouter();
  const [filter, setFilter] = useState(query);
  const [keyword, setKeyword] = useState(query.keyword || "");
  const debouncedKeyword = useDebounce<string>(keyword, 500);

  const onFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name === "keyword") {
      setKeyword(value);
    } else {
      setFilter({ ...filter, [name]: value });
    }
  };

  useEffect(() => {
    const newQuery = {
      ...filter,
      keyword: debouncedKeyword,
    };
    const queryString = objectToQueryString(clearQuery(newQuery), "&");
    router.push(`/event?${queryString}`);
  }, [debouncedKeyword, router, keyword, filter]);

  return {
    onFilterChange,
  };
};

function clearQuery(query: Record<string, any>): Record<string, any> {
  const cleanedQuery: Record<string, any> = {};
  Object.keys(query).forEach((key) => {
    if (query[key] !== "") {
      cleanedQuery[key] = query[key];
    }
  });

  return cleanedQuery;
}

export default useEventFilter;
