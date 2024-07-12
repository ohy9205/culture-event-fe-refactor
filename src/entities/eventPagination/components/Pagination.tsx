"use client";

import useEventPagination from "../hooks/useEventPagination";

type Props = {
  totalPage: number;
  query: Record<string, any>;
};

const Pagination = ({ totalPage, query }: Props) => {
  const {
    data: { curPaging, pageButtonArray, totalRow },
    onNextBtnHandler,
    onPageBtnHandler,
    onPrevBtnHandler,
  } = useEventPagination(totalPage, query);

  return (
    <section className="flex gap-5 justify-center m-auto mb-10">
      <button
        onClick={onPrevBtnHandler}
        className={curPaging.row === 1 ? "text-gray-300 cursor-default" : ""}>
        [이전]
      </button>

      {pageButtonArray.map((it) => (
        <button
          key={it}
          onClick={() => onPageBtnHandler(it)}
          className={`${it === curPaging.page ? "font-extrabold" : ""}`}>
          {it}
        </button>
      ))}

      <button
        onClick={onNextBtnHandler}
        className={
          totalRow === curPaging.row ? "text-gray-300 cursor-default" : ""
        }>
        [이후]
      </button>
    </section>
  );
};

export default Pagination;
