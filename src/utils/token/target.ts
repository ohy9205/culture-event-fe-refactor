export interface Token {
  getToken(name: string): string | null | undefined;
  setToken(name: string, token: string): void;
  removeToken(name: string): void;
}
