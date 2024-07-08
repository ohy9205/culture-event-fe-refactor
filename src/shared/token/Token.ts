import { Cookie, Localstorage } from "../store";

type Adapter = Cookie | Localstorage;
type TokenItme = string | null | undefined;

class Token {
  private adapter: Adapter;
  constructor(classAdapter: Cookie | Localstorage) {
    this.adapter = classAdapter;
  }

  get at(): TokenItme {
    return this.adapter.getItem("at");
  }
  get rt(): TokenItme {
    return this.adapter.getItem("rt");
  }

  set at(token: string) {
    this.adapter.setItem("at", token);
  }
  set rt(token: string) {
    this.adapter.setItem("rt", token);
  }

  removeAt() {
    this.adapter.removeItem("at");
  }

  removeRt() {
    this.adapter.removeItem("rt");
  }
}

export default Token;
