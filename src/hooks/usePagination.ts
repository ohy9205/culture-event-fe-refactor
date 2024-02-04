import { useContext } from "react";
import { PaginationContext } from "../context/PaginationContext";

const usePagination = () => {
  return useContext(PaginationContext);
};

export default usePagination;
