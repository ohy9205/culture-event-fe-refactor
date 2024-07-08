import { expect, it } from "@jest/globals";
import { convertKRTime } from "..";

// converKRTime으로 인자를 전달할 때 데이터 포맷에 따라 서로 다른 결과가 노출되는걸 확인
// "2024.01.01" ->  "2024. 1. 1. 오전 12:00:00", "2024-01-01" -> "2024. 1. 1. 오전 05:00:00"
// 날짜만 전달할 시 전자는 UTC 시간으로 파싱, 후자는 로컬 시간으로 파싱되기 때문
// -> 시간 변환 전 어떤 포맷으로 들어오더라도 YYYY-MM-DD 형식으로 변환하는 과정을 추가함
it("인자로 전달받은 날짜 정보를 ko-KR타임 'yyyy. MM. dd. aa hh:mm:ss' 형식으로 변환한다.", () => {
  expect(convertKRTime("2024-01-01T10:15:30.000Z")).toEqual(
    "2024. 01. 01. 오후 07:15:30"
  );
  expect(convertKRTime("2024.01.01T10:15:30.000Z")).toEqual(
    "2024. 01. 01. 오후 07:15:30"
  );
  expect(convertKRTime("2024-01-01")).toEqual("2024. 01. 01. 오전 09:00:00");
  expect(convertKRTime("2024.01.01")).toEqual("2024. 01. 01. 오전 09:00:00");
});
