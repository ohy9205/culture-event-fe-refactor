import { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const initialPagination = {
  pageIndex: 0,
  pagingGroupIndex: 0,
};

export const PaginationContext = createContext({
  pagination: initialPagination,
  onInitPagingHandler: () => {},
  onPagingHandler: (curIndex: number) => {},
  onPrevBtnHandler: () => {},
  onNextBtnHandler: (totalPage: number) => {},
});

export const PaginationProvider = ({ children }: Props) => {
  const pageButtonSize = 10;
  const [pagination, setPagination] = useState(initialPagination);
  const { pageIndex, pagingGroupIndex } = pagination;

  const onInitPagingHandler = () => {
    setPagination({ pageIndex: 0, pagingGroupIndex: 0 });
  };

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

  const onNextBtnHandler = (totalPage: number) => {
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

  return (
    <PaginationContext.Provider
      value={{
        pagination,
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
