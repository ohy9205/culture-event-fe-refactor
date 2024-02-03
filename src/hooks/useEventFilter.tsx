import { createContext } from "react";
import { FilterContext } from "../context/FilterContext";

const useEventFilter = () => {
  return createContext(FilterContext);
};

export default useEventFilter;
