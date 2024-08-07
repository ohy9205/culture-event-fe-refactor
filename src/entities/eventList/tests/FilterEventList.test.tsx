import { render } from "@/src/__mocks__/lib";
import { EventDetail } from "@/src/entities/eventDetail";
import { screen, waitFor, within } from "@testing-library/dom";
import { FilteredEventList } from "..";

const mockEventList = [
  {
    id: 257,
    category: "전시/미술",
    location: "광진구",
    title: "[서울상상나라] 우리, 캠핑 가요!",
    eventPeriod: "2023-10-31~2024-12-31",
    place: "서울상상나라 3층 문화놀이",
    hostOrganization: "서울상상나라",
    targetAudience: "서울상상나라 관람객",
    fee: "무료(입장권 4,000원 별도)",
    performerInfo: "",
    programInfo: "",
    otherInfo: "",
    homePage: "https://www.seoulchildrensmuseum.org/display/displayAll.do",
    latitude: "127.077569",
    longitude: "37.550550",
    isFree: true,
    thumbnail:
      "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=cb2af3a9757741aa996b416188cbffcf&thumb=Y",
    startDate: "2023-10-31",
    endDate: "2024-12-31",
    views: 231,
    likes: 1,
    createdAt: "2024-02-02T17:35:01.000Z",
    updatedAt: "2024-07-18T16:42:50.000Z",
  },
  {
    id: 235,
    category: "전시/미술",
    location: "은평구",
    title: "[서울기록원] 기록으로 산책하기_서울의 공원 展",
    eventPeriod: "2023-12-01~2026-09-29",
    place: "서울기록원 2층 제2전시실",
    hostOrganization: "서울기록원",
    targetAudience: "누구나",
    fee: "무료",
    performerInfo: "",
    programInfo: "",
    otherInfo: "",
    homePage: "https://archives.seoul.go.kr/exhibitions-programs/programs/3517",
    latitude: "126.93486015241535",
    longitude: "37.60753302960548",
    isFree: true,
    thumbnail:
      "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=edc20ae71b5a494ba321034295dfb807&thumb=Y",
    startDate: "2023-12-01",
    endDate: "2026-09-29",
    views: 0,
    likes: 1,
    createdAt: "2024-02-02T17:35:01.000Z",
    updatedAt: "2024-07-10T15:10:25.000Z",
  },
  {
    id: 233,
    category: "전시/미술",
    location: "중랑구",
    title: "[중랑문화재단] 중랑아트센터 실감미디어 상설전시 [중섭이 그린 사랑]",
    eventPeriod: "2023-12-06~2024-09-14",
    place: "중랑아트센터 실감전시실 1관",
    hostOrganization: "중랑문화재단",
    targetAudience: "누구나",
    fee: "무료",
    performerInfo: "",
    programInfo: "",
    otherInfo: "",
    homePage:
      "https://www.jnac.or.kr/exhibition/exhibit_view.html?pid=120&redir=%2Fexhibition%2Fexhibit_list.html%3Fstatus%3D%26find%3D%26search%3D%26page%3D1",
    latitude: "127.09151902086259",
    longitude: "37.59821054611063",
    isFree: true,
    thumbnail:
      "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=b94f3e4645a54578ae6928c37ac28171&thumb=Y",
    startDate: "2023-12-06",
    endDate: "2024-09-14",
    views: 0,
    likes: 1,
    createdAt: "2024-02-02T17:35:01.000Z",
    updatedAt: "2024-07-10T15:10:26.000Z",
  },
  {
    id: 222,
    category: "전시/미술",
    location: "강북구",
    title: "상상 톡톡 미술관 청년작가전 fuse",
    eventPeriod: "2023-12-15~2024-12-21",
    place: "북서울꿈의숲 상상톡톡미술관",
    hostOrganization: "세종문화회관",
    targetAudience: "4세 이상 ",
    fee: "",
    performerInfo: "",
    programInfo: "",
    otherInfo: "",
    homePage:
      "https://www.sejongpac.or.kr/portal/performance/performance/view.do?performIdx=34931&menuNo=200004",
    latitude: "127.044324732036",
    longitude: "37.6202544613023",
    isFree: true,
    thumbnail:
      "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=a4f7c7f2ae24482496c939a2275e2b1e&thumb=Y",
    startDate: "2023-12-15",
    endDate: "2024-12-21",
    views: 0,
    likes: 0,
    createdAt: "2024-02-02T17:35:01.000Z",
    updatedAt: "2024-07-10T15:12:31.000Z",
  },
  {
    id: 215,
    category: "전시/미술",
    location: "중구",
    title: "[서울디자인재단] DDP 45133",
    eventPeriod: "2023-12-21~2024-11-30",
    place: "DDP 디자인랩 3층 디자인쇼룸",
    hostOrganization: "서울디자인재단",
    targetAudience: "누구나",
    fee: "무료",
    performerInfo: "",
    programInfo: "",
    otherInfo: "",
    homePage:
      "https://ddp.or.kr/index.html?menuno=240&siteno=2&bbsno=509&boardno=15&bbstopno=509&act=view&subno=",
    latitude: "127.0096257245",
    longitude: "37.5668131264",
    isFree: true,
    thumbnail:
      "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=3dbab79ce94b4db7b0565d24039c2b71&thumb=Y",
    startDate: "2023-12-21",
    endDate: "2024-11-30",
    views: 0,
    likes: 0,
    createdAt: "2024-02-02T17:35:01.000Z",
    updatedAt: "2024-02-02T17:35:01.000Z",
  },
  {
    id: 198,
    category: "교육/체험",
    location: "중구",
    title: "DDP 투어 프로그램:건축투어",
    eventPeriod: "2024-01-01~2024-12-31",
    place: "DDP 뮤지엄(배움터) 1층 투어데스크",
    hostOrganization: "동대문디자인플라자",
    targetAudience:
      "만 13세 이상 (중학생 이상) 참여 (만 13세 이하, 2명당 보호자 1명 필수, 현장 조정 불가)",
    fee: "",
    performerInfo: "",
    programInfo: "",
    otherInfo: "",
    homePage:
      "https://ddp.or.kr/index.html?menuno=239&siteno=2&bbsno=44&boardno=21&bbstopno=56&act=view&subno=1",
    latitude: "127.0096257245",
    longitude: "37.5668131264",
    isFree: true,
    thumbnail:
      "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=63a7e31504494a4aad5fa73de878bdc8&thumb=Y",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    views: 0,
    likes: 0,
    createdAt: "2024-02-02T17:35:01.000Z",
    updatedAt: "2024-02-02T17:35:01.000Z",
  },
  {
    id: 199,
    category: "교육/체험",
    location: "은평구",
    title:
      "[구립증산정보도서관] 자녀교육 특화 온라인 북큐레이션 [자녀와 함께 성장하는 부모]",
    eventPeriod: "2024-01-01~2024-12-31",
    place: "도서관 홈페이지 및  sns",
    hostOrganization: "은평구청",
    targetAudience: "누구나",
    fee: "",
    performerInfo: "",
    programInfo: "",
    otherInfo: "",
    homePage:
      "https://www.jsplib.or.kr/culture/event.asp?mode=view&lecture_seq=1885&listname=normal",
    latitude: "126.9075589",
    longitude: "37.5827270",
    isFree: true,
    thumbnail:
      "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=52a921e8ff8548358e0356ccbc67cd1e&thumb=Y",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    views: 0,
    likes: 0,
    createdAt: "2024-02-02T17:35:01.000Z",
    updatedAt: "2024-02-02T17:35:01.000Z",
  },
  {
    id: 201,
    category: "기타",
    location: "동대문구",
    title: "[서울풍물시장] 청춘1번가",
    eventPeriod: "2024-01-01~2024-12-31",
    place: "서울풍물시장 2층 청춘1번가",
    hostOrganization: "서울풍물시장",
    targetAudience: "누구나",
    fee: "무료",
    performerInfo: "담당자 1명, 단기근로자 2명",
    programInfo: "테마포토존, 청춘다방, 풍물미용실",
    otherInfo: "",
    homePage: "http://www.pungmul.or.kr/",
    latitude: "127.025502937291",
    longitude: "37.5727131853349",
    isFree: true,
    thumbnail:
      "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=79d630b659a74921ada0a9a8cd8cac84&thumb=Y",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    views: 0,
    likes: 0,
    createdAt: "2024-02-02T17:35:01.000Z",
    updatedAt: "2024-02-02T17:35:01.000Z",
  },
  {
    id: 203,
    category: "전시/미술",
    location: "종로구",
    title: "동대문 역사관",
    eventPeriod: "2024-01-01~2024-12-31",
    place: "2호선 동대문역사문화공원 1번, 2번 출구 / 4호선 동대문역 7번 출구",
    hostOrganization: "동대문디자인플라자",
    targetAudience: "누구나",
    fee: "",
    performerInfo: "",
    programInfo: "",
    otherInfo: "",
    homePage:
      "https://ddp.or.kr/index.html?menuno=239&siteno=2&bbsno=50&boardno=21&bbstopno=49&act=view&subno=",
    latitude: "127.010890355484",
    longitude: "37.5680445876689",
    isFree: true,
    thumbnail:
      "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=66170fa63f40437e866de7a65fdf889d&thumb=Y",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    views: 0,
    likes: 0,
    createdAt: "2024-02-02T17:35:01.000Z",
    updatedAt: "2024-02-02T17:35:01.000Z",
  },
  {
    id: 200,
    category: "전시/미술",
    location: "동대문구",
    title: "동대문운동장 기념관",
    eventPeriod: "2024-01-01~2024-12-31",
    place: "2호선 동대문역사문화공원 1번, 2번 출구 / 4호선 동대문역 7번 출구",
    hostOrganization: "동대문디자인플라자",
    targetAudience: "누구나",
    fee: "",
    performerInfo: "",
    programInfo: "",
    otherInfo: "",
    homePage:
      "https://ddp.or.kr/index.html?menuno=239&siteno=2&bbsno=49&boardno=21&bbstopno=50&act=view&subno=",
    latitude: "127.010890355484",
    longitude: "37.5680445876689",
    isFree: true,
    thumbnail:
      "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=c3848573720a4ada9c9cd3e84dea2de9&thumb=Y",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    views: 0,
    likes: 0,
    createdAt: "2024-02-02T17:35:01.000Z",
    updatedAt: "2024-02-02T17:35:01.000Z",
  },
  {
    id: 202,
    category: "전시/미술",
    location: "중구",
    title: "매거진 라이브러리: 기록에 머물다",
    eventPeriod: "2024-01-01~2024-12-31",
    place: "DDP 디자인랩(살림터) 3층 매거진 라이브러리",
    hostOrganization: "동대문디자인플라자",
    targetAudience: "누구나",
    fee: "",
    performerInfo: "",
    programInfo: "",
    otherInfo: "",
    homePage:
      "https://ddp.or.kr/index.html?menuno=239&siteno=2&bbsno=57&boardno=21&bbstopno=57&act=view&subno=1",
    latitude: "127.0096257245",
    longitude: "37.5668131264",
    isFree: true,
    thumbnail:
      "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=ca6e4765d30b4274ba987d1c5b5dc3a5&thumb=Y",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    views: 0,
    likes: 0,
    createdAt: "2024-02-02T17:35:01.000Z",
    updatedAt: "2024-02-02T17:35:01.000Z",
  },
  {
    id: 161,
    category: "교육/체험",
    location: "종로구",
    title: "[서울역사박물관] 청소년 자원봉사 서울역사지킴이",
    eventPeriod: "2024-01-20~2024-09-28",
    place: "서울역사박물관",
    hostOrganization: "서울역사박물관",
    targetAudience: "초등학생 동반 가족 대상",
    fee: "무료",
    performerInfo: "",
    programInfo: "",
    otherInfo: "",
    homePage:
      "https://museum.seoul.go.kr/www/board/NR_boardList.do?bbsCd=1005&categoryVal=&sso=ok",
    latitude: "126.9704375",
    longitude: "37.5701434",
    isFree: true,
    thumbnail:
      "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=797af7e006cd4ceb96a77da5f8d283d9&thumb=Y",
    startDate: "2024-01-20",
    endDate: "2024-09-28",
    views: 0,
    likes: 0,
    createdAt: "2024-02-02T17:35:01.000Z",
    updatedAt: "2024-02-02T17:35:01.000Z",
  },
];

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
    await render(<FilteredEventList events={mockEventList} />);

    expect(screen.getByText("포스터뷰")).toHaveClass("bg-slate-900");

    expect(screen.getByTestId("poster-list")).toBeInTheDocument();
  });

  it("목록에서 특정 이벤트를 클릭하면 상세정보 모달이 열린다", async () => {
    const { user } = await render(<FilteredEventList events={mockEventList} />);

    await waitFor(async () => {
      await user.click(screen.getByText("[서울상상나라] 우리, 캠핑 가요!"));
    });

    expect(openFn).toHaveBeenCalledWith(<EventDetail id={257} />);
  });
});

describe("map tab", () => {
  it("지도뷰 탭을 클릭하면 지도를 가진 MapList 컴포넌트가 보여진다", async () => {
    const { user } = await render(<FilteredEventList events={mockEventList} />);

    await waitFor(async () => await user.click(screen.getByText("지도뷰")));

    expect(screen.getByText("지도뷰")).toHaveClass("bg-slate-900");

    expect(screen.getByTestId("map-list")).toBeInTheDocument();

    expect(screen.getByText("Static Map")).toBeInTheDocument();
  });

  it("목록에서 '상세정보' 버튼을 클릭하면 해당 이벤트 상세정보 모달이 열린다.", async () => {
    const { user } = await render(<FilteredEventList events={mockEventList} />);

    await waitFor(async () => await user.click(screen.getByText("지도뷰")));

    const [firstEvent] = screen.getAllByText("상세정보");

    await waitFor(
      async () => await user.click(within(firstEvent).getByText("상세정보"))
    );

    expect(openFn).toHaveBeenCalledWith(<EventDetail id={257} />);
  });
});
