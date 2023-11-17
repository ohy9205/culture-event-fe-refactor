"use client";

import { Dispatch, SetStateAction } from "react";

type Props = {
  totalPage: number;
  pagination: {
    pageIndex: number;
    pagingGroupIndex: number;
  };
  setPagination: Dispatch<
    SetStateAction<{
      pageIndex: number;
      pagingGroupIndex: number;
    }>
  >;
};

const PAGE_BUTTON_SIZE = 10;

const Pagination = ({ totalPage, pagination, setPagination }: Props) => {
  const { pageIndex, pagingGroupIndex } = pagination;

  const onPagingHandler = (curIndex: number) => {
    setPagination((prev) => ({ ...prev, pageIndex: curIndex - 1 }));
  };

  const onPrevBtnHandler = () => {
    if (pagingGroupIndex < 1) {
      return;
    }

    setPagination((prev) => ({
      ...prev,
      pagingGroupIndex: --prev.pagingGroupIndex,
      pageIndex:
        (pagingGroupIndex - 1) * PAGE_BUTTON_SIZE + PAGE_BUTTON_SIZE - 1,
    }));
  };

  const onNextBtnHandler = () => {
    const TOTAL_PAGING_GROUP_COUNT = Math.ceil(totalPage / PAGE_BUTTON_SIZE);
    if (pagingGroupIndex === TOTAL_PAGING_GROUP_COUNT - 1) {
      return;
    }

    setPagination((prev) => ({
      ...prev,
      pagingGroupIndex: ++prev.pagingGroupIndex,
      pageIndex: (pagingGroupIndex + 1) * PAGE_BUTTON_SIZE,
    }));
  };

  const renderButton = () => {
    let arr = [];
    for (let i = 1; i <= PAGE_BUTTON_SIZE; i++) {
      let curButtonNum = pagingGroupIndex * PAGE_BUTTON_SIZE + i;

      if (curButtonNum > totalPage) {
        return arr;
      }
      arr.push(
        <button
          key={curButtonNum}
          onClick={() => onPagingHandler(curButtonNum)}
          className={curButtonNum === pageIndex + 1 ? "font-bold" : ""}
        >
          {curButtonNum}
        </button>
      );
    }
    return arr;
  };

  return (
    <section className="flex gap-5 justify-center m-auto mb-10">
      <button onClick={onPrevBtnHandler}>[이전]</button>
      {renderButton()}
      <button onClick={onNextBtnHandler}>[이후]</button>
    </section>
  );
};

export default Pagination;
