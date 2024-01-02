"use client";
import { useContext } from "react";
import { PaginationContext } from "../../../context/PaginationContext";

type Props = {
  totalPage: number;
};

const PAGE_BUTTON_SIZE = 10;

const Pagination = ({ totalPage }: Props) => {
  const {
    onNextBtnHandler,
    onPagingHandler,
    onPrevBtnHandler,
    pagination: { pageIndex, pagingGroupIndex },
  } = useContext(PaginationContext);

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
      <button onClick={() => onNextBtnHandler(totalPage)}>[이후]</button>
    </section>
  );
};

export default Pagination;
