import { useDebounce } from "@/src/shared/hooks";
import { renderHook } from "@testing-library/react";
import React from "react";

const setStateFn = jest.fn();

jest
  .spyOn(React, "useState")
  .mockImplementation((initState?: any) => [initState, setStateFn]);

beforeEach(() => {
  jest.useFakeTimers();
});

it("지정한 시간이 지나면 데이터가 반환된다.", () => {
  // useDebounce 렌더링
  const { result } = renderHook(() => useDebounce("테스트", 300));

  // jest.advanceTimersbyTime를 이용해서 가짜로 시간 흐르게 함
  jest.advanceTimersByTime(300);

  // 시간 흐른 뒤 result에서 '테스트'라는 글자를 반환했는지 검증함
  expect(result.current).toBe("테스트");
});

it("여러번 호출되어도 마지막 호출을 기준으로 지정된 시간이 지난 후에만 데이터를 반환된다", () => {
  // 첫 호출
  const { result, rerender } = renderHook(() => useDebounce("테스트", 300));

  // 3초 이전에 재호출
  jest.advanceTimersByTime(200);
  rerender();

  // 3초 이전에 재호출
  jest.advanceTimersByTime(100);
  rerender();

  // 3초 이전에 재호출 (마지막호출)
  jest.advanceTimersByTime(200);
  rerender();

  jest.advanceTimersByTime(300);

  expect(setStateFn).toHaveBeenCalledTimes(1);
});
