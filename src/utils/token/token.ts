import { Cookie } from "@/src/utils/store/cookieAdapter";
import { Localstorage } from "../store/localstorageAdapter";

type Adapter = Cookie | Localstorage;
type TokenItme = string | null | undefined;
type Tokens = {
  at: TokenItme;
  rt: TokenItme;
};

export class Token {
  private adapter: Adapter;
  private token: Tokens;
  constructor(classAdapter: Cookie | Localstorage) {
    this.adapter = classAdapter;
    this.token = {
      at: this.adapter.getItem("at"),
      rt: this.adapter.getItem("rt"),
    };
  }

  get at(): TokenItme {
    return this.token.at;
  }
  get rt(): TokenItme {
    return this.token.rt;
  }
  get allToken(): Tokens {
    return this.token;
  }
  set at(token: string) {
    this.token.at = token;
  }
  set rt(token: string) {
    this.token.rt = token;
  }
  set allToken(tokens: Tokens) {
    this.token.at = tokens.at;
    this.token.rt = tokens.rt;
  }
}
