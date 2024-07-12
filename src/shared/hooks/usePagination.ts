"use client";

import { useState } from "react";

// totalPage: 총 나와야 하는 페이지
const usePagination = (
  initPage: number,
  totalPage: number,
  pageButtonCount: number
) => {
  const [curPaging, setCurPaging] = useState(
    getCurPaging(initPage, pageButtonCount)
  );
  const totalRow =
    totalPage % pageButtonCount > 0
      ? Math.ceil(totalPage / pageButtonCount)
      : totalPage / pageButtonCount;

  // 페이지 버튼
  const onPageBtnHandler = (curPageIndex: number) => {
    setCurPaging(getCurPaging(curPageIndex, pageButtonCount));
  };

  // [이전]버튼
  const onPrevBtnHandler = () => {
    if (curPaging.row === 1) {
      // 현재 그룹 카운트가 1페이지면 암것도 안하고 반환
      return;
    }
    setCurPaging(
      getCurPaging((curPaging.row - 1) * pageButtonCount, pageButtonCount)
    );
  };

  // [이후]버튼
  const onNextBtnHandler = () => {
    // 총 페이지그룹 넘버랑 지금 넘버랑 같으면 암것도 안하고 리턴
    if (totalRow === curPaging.row) {
      return;
    }

    setCurPaging(
      getCurPaging(curPaging.row * pageButtonCount + 1, pageButtonCount)
    );
  };

  // 페이지 버튼 넘버 생성
  const getPageButtonArray = () => {
    let arr = [];
    for (let i = 1; i <= pageButtonCount; i++) {
      let curButtonNum = (curPaging.row - 1) * pageButtonCount + i;

      if (curButtonNum > totalPage) {
        return arr;
      }
      arr.push(curButtonNum);
    }
    return arr;
  };

  return {
    data: { curPaging, totalRow, pageButtonArray: getPageButtonArray() },
    onPageBtnHandler,
    onPrevBtnHandler,
    onNextBtnHandler,
  };
};

const getCurPaging = (curPage: number, pageButtonCount: number) => {
  return {
    page: curPage,
    row: Math.ceil(curPage / pageButtonCount),
  };
};

export default usePagination;
