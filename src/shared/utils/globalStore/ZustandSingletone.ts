import ZustandStore from "./ZustandStore";

class ZustandSingletone {
  private static instances: Map<string, ZustandStore<any>> = new Map();

  static create<T>(key: string, initialState: T): ZustandStore<T> {
    if (!this.instances.has(key)) {
      this.instances.set(key, new ZustandStore<T>(initialState));
    }
    return this.instances.get(key) as ZustandStore<T>;
  }
}

export default ZustandSingletone;
