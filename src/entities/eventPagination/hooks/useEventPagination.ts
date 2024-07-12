"use client";

import { usePagination } from "@/src/shared/hooks";
import { objectToQueryString } from "@/src/shared/lib";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useEventPagination = (totalPage: number, query: Record<string, any>) => {
  const {
    data: { curPaging, pageButtonArray, totalRow },
    onNextBtnHandler,
    onPageBtnHandler,
    onPrevBtnHandler,
  } = usePagination(Number(query.pageIndex), totalPage, 5);

  const router = useRouter();

  useEffect(() => {
    router.push(
      `/event?${objectToQueryString(
        { ...query, pageIndex: curPaging.page },
        "&"
      )}`
    );
  }, [curPaging.page]);

  return {
    onNextBtnHandler,
    onPageBtnHandler,
    onPrevBtnHandler,
    data: { curPaging, pageButtonArray, totalRow },
  };
};

export default useEventPagination;
