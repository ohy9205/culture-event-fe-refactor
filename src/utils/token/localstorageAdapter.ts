import { Token } from "./target";

export class LocalStorageTokenAdaptor implements Token {
  getToken(name: string): string | null {
    return localStorage.getItem(name);
  }
  setToken(name: string, token: string): void {
    localStorage.setItem(name, token);
  }
  removeToken(name: string): void {
    localStorage.removeItem(name);
  }
}
