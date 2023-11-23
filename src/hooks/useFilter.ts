import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type Filter = {
  location: string;
  category: string;
  cost: string;
  startDate: string;
  endDate: string;
  orderBy: string;
};

const useFilter = () => {
  const router = useRouter();
  const query = useSearchParams().get("orderBy");

  const [filter, setFilter] = useState<Filter>({
    location: "",
    category: "",
    cost: "",
    startDate: "",
    endDate: "",
    orderBy: query ? query : "",
  });

  const onFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilter((prev: Filter) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (query) {
      router.replace("/event");
    }
  }, [query, router]);

  return {
    filter,
    onFilterChange,
  };
};

export default useFilter;
