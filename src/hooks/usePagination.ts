import { Dispatch, SetStateAction } from "react";

export type Pagination = {
  pageIndex: number;
  pagingGroupIndex: number;
};

export type SetPagination = Dispatch<
  SetStateAction<{
    pageIndex: number;
    pagingGroupIndex: number;
  }>
>;

const usePagination = (
  pagination: Pagination,
  setPagination: SetPagination,
  totalPage: number,
  pageButtonSize: number
) => {
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
      pageIndex: (pagingGroupIndex - 1) * pageButtonSize + pageButtonSize - 1,
    }));
  };

  const onNextBtnHandler = () => {
    const TOTAL_PAGING_GROUP_COUNT = Math.ceil(totalPage / pageButtonSize);
    if (pagingGroupIndex === TOTAL_PAGING_GROUP_COUNT - 1) {
      return;
    }

    setPagination((prev) => ({
      ...prev,
      pagingGroupIndex: ++prev.pagingGroupIndex,
      pageIndex: (pagingGroupIndex + 1) * pageButtonSize,
    }));
  };

  return {
    onPagingHandler,
    onPrevBtnHandler,
    onNextBtnHandler,
  };
};

export default usePagination;
