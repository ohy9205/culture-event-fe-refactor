"use client";

import usePagination from "@/src/hooks/usePagination";

type Props = {
  totalPage: number;
  query: Record<string, any>;
};

const Pagination = ({ totalPage, query }: Props) => {
  const {
    data: { curPageGroupCount, totalPageGroupCount, curPageIndex },
    onNextBtnHandler,
    onPageBtnHandler,
    onPrevBtnHandler,
    renderButton,
  } = usePagination(totalPage, query);

  return (
    <section className="flex gap-5 justify-center m-auto mb-10">
      <button
        onClick={onPrevBtnHandler}
        className={
          curPageGroupCount === 1 ? "text-slate-300 cursor-default" : ""
        }
      >
        [이전]
      </button>

      {renderButton().map((it) => (
        <button
          key={it}
          onClick={() => onPageBtnHandler(it)}
          className={`${it === curPageIndex ? "font-extrabold" : ""}`}
        >
          {it}
        </button>
      ))}

      <button
        onClick={() => onNextBtnHandler()}
        className={
          totalPageGroupCount === curPageGroupCount
            ? "text-slate-300 cursor-default"
            : ""
        }
      >
        [이후]
      </button>
    </section>
  );
};

export default Pagination;
