export interface Store {
  getItem(name: string): string | null | undefined;
  setItem(name: string, token: string): void;
  removeItem(name: string): void;
}
