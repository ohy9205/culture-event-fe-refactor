// 권한에 따른 페이지 접속
beforeEach(() => {
  cy.visit("/");
});

describe("로그인이 필요한 페이지에 비로그인 상태로 접근하면 로그인 페이지로 리다이렉트된다.", () => {
  it("Event페이지에 접근하면 '로그인이 필요한 페이지입니다.' alert창이 뜨고, 확인을 클릭하면 로그인 페이지로 이동한다.", () => {
    cy.visit("/event");

    cy.on("window:alert", (t) => {
      expect(t).to.equal("로그인이 필요한 페이지입니다.");
    });

    cy.checkUrl("/signin");
  });

  it("MyPage페이지에 접근하면 로그인 페이지로 리다이렉트 된다", () => {
    cy.visit("/my-page");

    cy.on("window:alert", (t) => {
      expect(t).to.equal("로그인이 필요한 페이지입니다.");
    });

    cy.checkUrl("/signin");
  });
});

describe("로그인된 상태면 로그인이 필요한 페이지에 접근할 수 있다.", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Event페이지에 접근할 수 있다", () => {
    cy.visit("/event");
    cy.checkUrl("/event");
  });
  it("MyPage페이지에 접근할 수 있다", () => {
    cy.visit("/my-page");
    cy.checkUrl("/my-page");
  });
});

it("로그인 상태로 회원가입 페이지에 접근하면 메인 페이지로 리다이렉트된다.", () => {
  cy.login();
  cy.visit("/signup");
  cy.checkUrl("/");
});
