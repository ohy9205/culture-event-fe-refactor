import { ZustandStore } from "./ZustandStore";

export class ZustandSingletone<T> {
  private static instance: ZustandStore<any>;

  static getStore<T>(initialState: T): ZustandStore<T> {
    if (!this.instance) {
      this.instance = new ZustandStore<T>(initialState);
    }
    return this.instance;
  }
}
