import { useContext } from "react";
import { FilterContext } from "../context/FilterContext";

const useEventFilter = () => {
  return useContext(FilterContext);
};

export default useEventFilter;
