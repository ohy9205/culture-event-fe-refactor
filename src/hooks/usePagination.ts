import { createContext } from "react";
import { PaginationContext } from "../context/PaginationContext";

const usePagination = () => {
  return createContext(PaginationContext);
};

export default usePagination;
