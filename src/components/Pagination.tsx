"use client";

import React, { SetStateAction, Dispatch, useMemo } from "react";

type Props = {
  pagePerSize: number;
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

const Pagination = ({
  pagePerSize,
  totalPage,
  pagination,
  setPagination,
}: Props) => {
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
      pageIndex: (pagingGroupIndex - 1) * pagePerSize + pagePerSize - 1,
    }));
  };

  const onNextBtnHandler = () => {
    const TOTAL_PAGING_GROUP_COUNT = Math.ceil(totalPage / pagePerSize);
    if (pagingGroupIndex === TOTAL_PAGING_GROUP_COUNT - 1) {
      return;
    }

    setPagination((prev) => ({
      ...prev,
      pagingGroupIndex: ++prev.pagingGroupIndex,
      pageIndex: (pagingGroupIndex + 1) * pagePerSize,
    }));
  };

  const renderButton = useMemo(() => {
    let arr = [];
    for (let i = 1; i <= pagePerSize; i++) {
      let curButtonNum = pagingGroupIndex * pagePerSize + i;

      if (curButtonNum > totalPage) {
        return arr;
      }
      arr.push(
        <button onClick={() => onPagingHandler(curButtonNum)}>
          {curButtonNum}
        </button>
      );
    }
    return arr;
  }, [pagingGroupIndex]);

  return (
    <section className="flex gap-5 justify-center m-auto mb-10">
      <button onClick={onPrevBtnHandler}>[이전]</button>
      {renderButton}
      <button onClick={onNextBtnHandler}>[이후]</button>
    </section>
  );
};

export default React.memo(Pagination);
