import LocalStoreAdapter from "../../../store/localStore/LocalStoreAdapter";

class MockStore implements LocalStoreAdapter {
  private store: { [key: string]: string } = {};

  getItem(name: string): string | undefined {
    return this.store[name];
  }

  setItem(name: string, value: string): void {
    this.store[name] = value;
  }

  removeItem(name: string): void {
    delete this.store[name];
  }
}

export default MockStore;
