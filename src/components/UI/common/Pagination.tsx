"use client";

import useEventFilter from "@/src/hooks/useEventFilter";
import usePagination from "@/src/hooks/usePagination";
import {
  objectToQueryString,
  replaceObjectKey,
} from "@/src/utils/common/objectController";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  totalPage: number;
};

const Pagination = ({ totalPage }: Props) => {
  const {
    data: { pageButtonSize, pageIndex, pagingGroupIndex },
    onNextBtnHandler,
    onPagingHandler,
    onPrevBtnHandler,
  } = usePagination();
  const { filter } = useEventFilter();
  const router = useRouter();

  const renderButton = () => {
    let arr = [];
    for (let i = 1; i <= pageButtonSize; i++) {
      let curButtonNum = (pagingGroupIndex - 1) * pageButtonSize + i;

      if (curButtonNum > totalPage) {
        return arr;
      }
      arr.push(curButtonNum);
    }
    return arr;
  };

  useEffect(() => {
    console.log("pagination");
    const paginationQuery = replaceObjectKey(filter, "pageIndex", pageIndex);
    router.push(`/event?${objectToQueryString(paginationQuery, "&")}`);
  }, [pageIndex]);

  return (
    <section className="flex gap-5 justify-center m-auto mb-10">
      <button onClick={onPrevBtnHandler}>[이전]</button>

      {renderButton().length === 0 && <button className="font-bold">1</button>}
      {renderButton().map((it: number) => (
        <button
          key={it}
          onClick={() => onPagingHandler(it)}
          className={`${it === pageIndex ? "text-red-600" : ""}`}
        >
          {it}
        </button>
      ))}

      <button onClick={() => onNextBtnHandler(totalPage)}>[이후]</button>
    </section>
  );
};

export default Pagination;
