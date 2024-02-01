import { CookieAdapter } from "../store/cookieAdapter";
import { LocalStorageAdaptor } from "../store/localstorageAdapter";

type Adapter = CookieAdapter | LocalStorageAdaptor;
type TokenItme = string | null | undefined;
type Tokens = {
  at: TokenItme;
  rt: TokenItme;
};

export class Token {
  private adapter: Adapter;
  private token: Tokens;
  constructor(classAdapter: CookieAdapter | LocalStorageAdaptor) {
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

  //   get at(): string | null | undefined {}''
  //   get rt(): string | null | undefined;
  //   set at(token: string);
  //   set rt(token: string);
  //   get allToken(): {
  //     at: string | null | undefined;
  //     rt: string | null | undefined;
  //   };
  //   set allToken(toekn: {
  //     at: string | null | undefined;
  //     rt: string | null | undefined;
  //   });
}
