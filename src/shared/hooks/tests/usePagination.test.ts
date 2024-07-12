import { usePagination } from "@/src/shared/hooks";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";

let pageButtonCount: number;

beforeEach(() => {
  pageButtonCount = 5;
});

it("usePagination(1,8,5)를 호출하면 curPaging이 {cur:1, row: 1}이 된다.", () => {
  const { result } = renderHook(() => usePagination(1, 8, 5));

  expect(result.current.data.curPaging).toEqual({ page: 1, row: 1 });
});

it("usePagination(1,8,5)를 호출하면 totalRow는 2가 된다", () => {
  const { result } = renderHook(() => usePagination(1, 8, 5));

  expect(result.current.data.totalRow).toBe(2);
});

it("usePagination(8,8,5)를 호출하면 pageButtonArray는 [6,7,8]이 된다", () => {
  const { result } = renderHook(() => usePagination(8, 8, 5));

  console.log(result.current.data.pageButtonArray);
  expect(result.current.data.pageButtonArray).toEqual([6, 7, 8]);
});

it("pageButtonCount가 5일 때 onPageBtnHandler(8)을 호출하면 curPaging이 {cur:8, row: 2 }가 된다.", () => {
  const { result } = renderHook(() => usePagination(1, 8, 5));

  const spy = jest.spyOn(result.current, "onPageBtnHandler");

  act(() => result.current.onPageBtnHandler(8));
  expect(spy).toHaveBeenCalledWith(8);
  expect(result.current.data.curPaging).toEqual({ page: 8, row: 2 });
});

describe("onPrevHandler", () => {
  it("curPaging.row가 1일 때 호출하면 아무 동작을 하지 않고 함수가 종료된다.", () => {
    const { result } = renderHook(() => usePagination(1, 8, 5));

    expect(result.current.data.curPaging).toEqual({ page: 1, row: 1 });

    const spy = jest.spyOn(result.current, "onPrevBtnHandler");

    act(() => result.current.onPrevBtnHandler());
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result.current.data.curPaging).toEqual({ page: 1, row: 1 });
  });

  it("pageButtonCount가 5, curPaging이 {cur: 8, row: 2}일 때 호출하면 curPaging이 {cur: 5, row: 1}가 된다.", () => {
    const { result } = renderHook(() => usePagination(8, 8, 5));

    expect(result.current.data.curPaging).toEqual({ page: 8, row: 2 });

    const spy = jest.spyOn(result.current, "onPrevBtnHandler");

    act(() => result.current.onPrevBtnHandler());
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result.current.data.curPaging).toEqual({ page: 5, row: 1 });
  });
});

describe("onNextBtnHandler", () => {
  it("totalRow가 curPaging.row와 같다면 아무 동작을 하지 않고 함수가 종료된다.", () => {
    const { result } = renderHook(() => usePagination(1, 5, 5));

    expect(result.current.data.curPaging).toEqual({ page: 1, row: 1 });
    expect(result.current.data.totalRow).toEqual(
      result.current.data.curPaging.row
    );

    const spy = jest.spyOn(result.current, "onNextBtnHandler");

    act(() => result.current.onNextBtnHandler());
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result.current.data.curPaging).toEqual({ page: 1, row: 1 });
  });

  it("pageButtonCount가 5, curPaging이 {cur: 1, row: 1}, totalRow가 2 일 때 호출하면 curPaging이 {cur: 6, row: 2}가 된다.", () => {
    const { result } = renderHook(() => usePagination(1, 10, 5));

    expect(result.current.data.curPaging).toEqual({ page: 1, row: 1 });

    const spy = jest.spyOn(result.current, "onNextBtnHandler");

    act(() => result.current.onNextBtnHandler());
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result.current.data.curPaging).toEqual({ page: 6, row: 2 });
  });
});
