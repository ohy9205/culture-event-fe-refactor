import { useRouter } from "next/navigation";
import { objectToQueryString } from "../utils/common/objectController";

const PAGE_BUTTON_SIZE = 5;

const usePagination = (totalPage: number, query: Record<string, any>) => {
  // return useContext(PaginationContext);

  const curPageIndex = Number(query.pageIndex) || 1;
  const totalPageGroupCount =
    totalPage % PAGE_BUTTON_SIZE !== 0
      ? Math.ceil(totalPage / PAGE_BUTTON_SIZE)
      : totalPage / PAGE_BUTTON_SIZE;
  const curPageGroupCount = Math.ceil(curPageIndex / PAGE_BUTTON_SIZE) || 1;
  const router = useRouter();

  const routePage = (curPageIndex: number, query: Record<string, any>) => {
    const newQuery = { ...query, pageIndex: curPageIndex };
    router.push(`/event?${objectToQueryString(newQuery, "&")}`);
  };

  // 페이지 버튼
  const onPageBtnHandler = (curPageIndex: number) => {
    routePage(curPageIndex, query);
  };

  // [이전]버튼
  const onPrevBtnHandler = () => {
    if (curPageGroupCount === 1) {
      // 현재 그룹 카운트가 1페이지면 암것도 안하고 반환
      return;
    }

    const curPageIndex = (curPageGroupCount - 2) * PAGE_BUTTON_SIZE + 1;
    routePage(curPageIndex, query);
  };

  // [이후]버튼
  const onNextBtnHandler = () => {
    // 총 페이지그룹 넘버랑 지금 넘버랑 같으면 암것도 안하고 리턴
    if (totalPageGroupCount === curPageGroupCount) {
      return;
    }

    const curPageIndex = PAGE_BUTTON_SIZE * curPageGroupCount + 1;
    routePage(curPageIndex, query);
  };

  // 페이지 버튼 렌더링
  const renderButton = () => {
    let arr = [];
    for (let i = 1; i <= PAGE_BUTTON_SIZE; i++) {
      let curButtonNum = (curPageGroupCount - 1) * PAGE_BUTTON_SIZE + i;

      if (curButtonNum > totalPage) {
        return arr;
      }
      arr.push(curButtonNum);
    }
    return arr;
  };

  return {
    data: { curPageGroupCount, totalPageGroupCount, curPageIndex },
    onPageBtnHandler,
    onPrevBtnHandler,
    onNextBtnHandler,
    renderButton,
  };
};

export default usePagination;
