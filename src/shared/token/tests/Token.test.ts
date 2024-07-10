import { beforeEach, describe, expect, it } from "@jest/globals";
import { Token } from "..";
import MockStorage from "./mocks/MockStorage";

// 토큰 관리 로직에서 Cookie, Localstorage의 함수들을 활용하지 못하고 있는걸 파악
// Token관리 로직에서 저장소에서 토큰을 get/set할 때 해당 스토어의 인터페이스를 사용하도록 함
// -> Token클래스에서 token객체를 제거하고 get/set 시 store로부터 바로 가져오도록 함

// Cookie, Localstorage 어댑터를 모두 체크할 필요는 없다.
// MockStorage를 만들어서 한번만 체크하자
describe("Token", () => {
  let token: Token;
  beforeEach(() => {
    token = new Token(new MockStorage());
  });

  it("스토리지에서 at, rt를 저장하고, 저장한 값을 꺼내온다.", () => {
    // at, rt 저장
    token.at = "access token";
    token.rt = "refresh token";

    // at, rt 꺼내오는 검증을 통해 저장이 잘 되었는지도 검증
    expect(token.at).toBe("access token");
    expect(token.rt).toBe("refresh token");
  });

  it("스토리지에 at, rt 값이 없다면 undefined를 반환한다", () => {
    expect(token.at).toBe(undefined);
    expect(token.rt).toBe(undefined);
  });

  it("스토리지에 저장된 at, rt 를 삭제한다.", () => {
    token.at = "access token";
    token.rt = "refresh token";

    token.removeAt();
    token.removeRt();

    expect(token.at).toBe(undefined);
    expect(token.rt).toBe(undefined);
  });
});
