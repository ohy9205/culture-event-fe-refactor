import LocalStoreAdapter from "./LocalStoreAdapter";

class Localstorage implements LocalStoreAdapter {
  getItem(name: string): string | null {
    return localStorage.getItem(name);
  }
  setItem(name: string, token: string): void {
    localStorage.setItem(name, token);
  }
  removeItem(name: string): void {
    localStorage.removeItem(name);
  }
}

export default Localstorage;
