"use client";

import { createContext, useState } from "react";

type Props = {
  initPageIndex: number;
  children: React.ReactNode;
};

const PAGE_BUTTON_SIZE = 5;

const initialPagination = {
  pageIndex: 1,
  pagingGroupIndex: 1,
};

export const PaginationContext = createContext({
  pagination: initialPagination,
  pageButtonSize: PAGE_BUTTON_SIZE,
  onInitPagingHandler: () => {},
  onPagingHandler: (curIndex: number) => {},
  onPrevBtnHandler: () => {},
  onNextBtnHandler: (totalPage: number) => {},
});

export const PaginationProvider = ({ children, initPageIndex }: Props) => {
  const [pagination, setPagination] = useState({
    ...initialPagination,
    pageIndex: initPageIndex,
  });
  const { pageIndex, pagingGroupIndex } = pagination;

  const onInitPagingHandler = () => {
    setPagination({ pageIndex: 1, pagingGroupIndex: 1 });
  };

  const onPagingHandler = (curIndex: number) => {
    setPagination((prev) => ({ ...prev, pageIndex: curIndex }));
  };

  const onPrevBtnHandler = () => {
    if (pagingGroupIndex - 1 < 1) {
      return;
    }

    setPagination((prev) => ({
      pagingGroupIndex: --prev.pagingGroupIndex,
      pageIndex: (pagingGroupIndex - 2) * PAGE_BUTTON_SIZE + PAGE_BUTTON_SIZE,
    }));
  };

  const onNextBtnHandler = (totalPage: number) => {
    const TOTAL_PAGING_GROUP_COUNT = Math.ceil(totalPage / PAGE_BUTTON_SIZE);
    if (pagingGroupIndex === TOTAL_PAGING_GROUP_COUNT - 1) {
      return;
    }

    setPagination((prev) => ({
      pagingGroupIndex: ++prev.pagingGroupIndex,
      pageIndex: (pagingGroupIndex + 1) * PAGE_BUTTON_SIZE,
    }));
  };

  return (
    <PaginationContext.Provider
      value={{
        pagination,
        pageButtonSize: PAGE_BUTTON_SIZE,
        onInitPagingHandler,
        onNextBtnHandler,
        onPagingHandler,
        onPrevBtnHandler,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
