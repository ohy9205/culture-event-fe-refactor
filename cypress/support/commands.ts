import "@testing-library/cypress/add-commands";

declare global {
  namespace Cypress {
    interface Chainable {
      checkUrl(url: string): void;
      login(): void;
    }
  }
}

Cypress.Commands.add("login", () => {
  const email = "test@test.com";
  const password = "1234";

  cy.session(email, () => {
    cy.visit("/signin");

    cy.findByPlaceholderText("email@culture.com").type(email);
    cy.findByPlaceholderText("password").type(password);
    cy.findByRole("button", { name: "로그인" }).click();

    //  // 캐싱하기 전에 로그인 프로세스가 완료되도록 보장하기 위해 추가한 단언
    cy.location("pathname").should("eq", "/");
  });

  // 로그인 이후 메인 홈페이지로 이동
  cy.visit("/");
});

Cypress.Commands.add("checkUrl", (url) => {
  cy.url().should("eq", `${Cypress.env("baseUrl")}${url}`);
});
