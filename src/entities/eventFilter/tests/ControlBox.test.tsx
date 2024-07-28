import { render } from "@/src/__mocks__/lib";
import * as mockConsts from "@/src/entities/eventFilter/tests/mockConsts";
import { screen, waitFor } from "@testing-library/dom";
import { ControlBox } from "..";

jest.mock("../consts", () => mockConsts);

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2023-12-31"));
});

it("prop으로 전달받은 쿼리가 있으면 필터 항목에 기본 적용되어 나타난다.", async () => {
  await render(
    <ControlBox
      query={{
        location: "강남구",
        category: "콘서트",
        isFree: "무료",
        start: "2024-01-01",
        end: "2024-12-31",
        orderBy: "latest",
        keyword: "행사",
      }}
    />
  );

  expect(
    screen.getByRole("option", { name: "강남구", selected: true })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("option", { name: "콘서트", selected: true })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("option", { name: "무료", selected: true })
  ).toBeInTheDocument();

  expect(screen.getByTestId("start-filter")).toHaveValue("2024-01-01");

  expect(screen.getByTestId("end-filter")).toHaveValue("2024-12-31");

  expect(
    screen.getByRole("option", { name: "곧 시작할 순", selected: true })
  ).toBeInTheDocument();

  screen.debug();
  expect(screen.getByPlaceholderText("검색어를 입력하세요")).toHaveValue(
    "행사"
  );
});

it("각 항목별 필터 옵션을 불러온다.", async () => {
  await render(<ControlBox query={{}} />);

  // location
  expect(screen.getByRole("option", { name: "지역구" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "강남구" })).toBeInTheDocument();

  // category
  expect(screen.getByRole("option", { name: "카테고리" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "콘서트" })).toBeInTheDocument();

  // isFree
  expect(screen.getByRole("option", { name: "비용" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "무료" })).toBeInTheDocument();

  // orderBy
  expect(
    screen.getByRole("option", { name: "빠른 시작일 순" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("option", { name: "곧 시작할 순" })
  ).toBeInTheDocument();
});

it("필터 옵션을 변경하면 해당 필터 내용으로 url 쿼리가 변경된다.", async () => {
  const { user, router } = await render(<ControlBox query={{}} />);

  const select = screen.getByTestId("location-select");

  expect(select).toHaveValue("");

  await waitFor(async () => {
    await user.selectOptions(select, "강남구");
  });

  const spy = jest.spyOn(router, "push");

  await waitFor(async () => {
    expect(spy).toHaveBeenCalledWith("/event?location=강남구");
  });
});

// 검색어로 필터링을 할 수 있다.
it("검색어로 필터링을 할 수 있다.", async () => {
  const { user, router } = await render(<ControlBox query={{}} />);

  const input = screen.getByPlaceholderText("검색어를 입력하세요");

  await waitFor(async () => {
    await user.type(input, "행사");
  });

  const spy = jest.spyOn(router, "push");

  await waitFor(() => {
    expect(spy).toHaveBeenCalledWith("/event?keyword=행사");
  });
});
