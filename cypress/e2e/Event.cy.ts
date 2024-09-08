beforeEach(() => {
  cy.visit("/");
});

describe("페이지 렌더링", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/event");
  });

  it('기본 렌더링은 "포스터 뷰"이며 12개의 목록을 불러온다.', () => {
    cy.findByTestId("poster-list").should("exist");
    cy.findAllByTestId("event-card").should("have.length", 12);
  });

  it("페이지네이션 버튼을 클릭하면 해당 페이지로 넘어간다.", () => {
    cy.findByRole("button", { name: "2" }).click();
    cy.checkUrl("/event?pageIndex=2");
    cy.findAllByTestId("event-card").should("have.length", 12);
  });

  it('"지도뷰" 버튼을 클릭하면 현재 페이지네이션을 유지한 채 지도 뷰 화면으로 바뀌어서 렌더링된다.', () => {
    cy.findByRole("button", { name: "2" }).click();
    cy.findByTestId("map-list").should("exist");
    cy.checkUrl("/event?pageIndex=2");
    cy.findAllByTestId("event-card").should("have.length", 12);
  });
});
