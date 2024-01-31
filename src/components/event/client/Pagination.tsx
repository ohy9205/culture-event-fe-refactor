"use client";
import { FilterContext } from "@/src/context/FilterContext";
import {
  objectToQueryString,
  replaceObjectKey,
} from "@/src/utils/objectController/objectController";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { PaginationContext } from "../../../context/PaginationContext";

type Props = {
  totalPage: number;
  pageSize: number;
};

const Pagination = ({ totalPage, pageSize }: Props) => {
  const {
    onNextBtnHandler,
    onPagingHandler,
    onPrevBtnHandler,
    pagination: { pageIndex, pagingGroupIndex },
    pageButtonSize,
  } = useContext(PaginationContext);
  const { filter } = useContext(FilterContext);
  const router = useRouter();

  const renderButton = () => {
    let arr = [];
    for (let i = 1; i <= pageButtonSize; i++) {
      let curButtonNum = (pagingGroupIndex - 1) * pageButtonSize + i;

      if (curButtonNum > totalPage) {
        return arr;
      }
      arr.push(
        <button
          key={curButtonNum}
          onClick={() => onPagingHandler(curButtonNum)}
          className={`${curButtonNum === pageIndex ? "font-bold" : ""}`}
        >
          {curButtonNum}
        </button>
      );
    }
    return arr;
  };

  useEffect(() => {
    const paginationQuery = replaceObjectKey(
      { ...filter },
      "pageIndex",
      pageIndex
    );

    router.push(`/event?${objectToQueryString(paginationQuery, "&")}`);
  }, [pageIndex, pageSize, filter, router]);

  return (
    <section className="flex gap-5 justify-center m-auto mb-10">
      <button onClick={onPrevBtnHandler}>[이전]</button>
      {renderButton()}
      <button onClick={() => onNextBtnHandler(totalPage)}>[이후]</button>
    </section>
  );
};

export default Pagination;
