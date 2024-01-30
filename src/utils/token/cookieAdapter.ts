import { cookies } from "next/headers";
import { Token } from "./target";

export class CookieTokenAdapter implements Token {
  getToken(name: string): string | undefined {
    return cookies().get(name)?.value;
  }
  setToken(name: string, token: string): void {
    cookies().set(name, token);
  }
  removeToken(name: string): void {
    cookies().delete(name);
  }
}
