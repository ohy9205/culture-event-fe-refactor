import { useRouter } from "next/navigation";
import { objectToQueryString } from "../utils/common/objectController";

const useEventFilter = (query: Record<string, any>) => {
  const router = useRouter();

  const onFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const clearQuery = cleanQuery({ ...query, pageIndex: 1, [name]: value });
    router.push(`/event?${objectToQueryString(clearQuery, "&")}`);
  };

  return {
    onFilterChange,
  };
};

function cleanQuery(query: Record<string, any>): Record<string, any> {
  const cleanedQuery: Record<string, any> = {};
  Object.keys(query).forEach((key) => {
    if (query[key] !== "") {
      cleanedQuery[key] = query[key];
    }
  });
  return cleanedQuery;
}

export default useEventFilter;
