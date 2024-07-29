import { render } from "@/src/__mocks__/lib";
import { screen, waitFor, within } from "@testing-library/dom";
import { FilteredEventList } from "..";
import { EventDetail } from "../../eventDetail";
import { mockEventlist } from "./mockEventList";

const openFn = jest.fn();
jest.mock("../../modal/hook/useModal", () => () => ({
  open: openFn,
}));

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2024-01-01"));
});

describe("poster tab", () => {
  it("기본으로 포스터뷰를 보여준다", async () => {
    await render(<FilteredEventList events={mockEventlist} />);

    expect(screen.getByText("포스터뷰")).toHaveClass("bg-slate-900");

    expect(screen.getByTestId("poster-list")).toBeInTheDocument();
  });

  it("목록에서 특정 이벤트를 클릭하면 상세정보 모달이 열린다", async () => {
    const { user } = await render(<FilteredEventList events={mockEventlist} />);

    await waitFor(async () => {
      await user.click(screen.getByText("[서울상상나라] 우리, 캠핑 가요!"));
    });

    expect(openFn).toHaveBeenCalledWith(<EventDetail id={257} />);
  });
});

describe("map tab", () => {
  it("지도뷰 탭을 클릭하면 지도를 가진 MapList 컴포넌트가 보여진다", async () => {
    const { user } = await render(<FilteredEventList events={mockEventlist} />);

    await waitFor(async () => await user.click(screen.getByText("지도뷰")));

    expect(screen.getByText("지도뷰")).toHaveClass("bg-slate-900");

    expect(screen.getByTestId("map-list")).toBeInTheDocument();

    expect(screen.getByText("Static Map")).toBeInTheDocument();
  });

  it("목록에서 '상세정보' 버튼을 클릭하면 해당 이벤트 상세정보 모달이 열린다.", async () => {
    const { user } = await render(<FilteredEventList events={mockEventlist} />);

    await waitFor(async () => await user.click(screen.getByText("지도뷰")));

    const [firstEvent] = screen.getAllByText("상세정보");

    await waitFor(
      async () => await user.click(within(firstEvent).getByText("상세정보"))
    );

    expect(openFn).toHaveBeenCalledWith(<EventDetail id={257} />);
  });
});
