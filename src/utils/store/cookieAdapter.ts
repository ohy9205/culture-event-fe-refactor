import { cookies } from "next/headers";
import { Store } from "./target";

export class CookieAdapter implements Store {
  getItem(name: string): string | undefined {
    return cookies().get(name)?.value;
  }
  setItem(name: string, token: string): void {
    cookies().set(name, token);
  }
  removeItem(name: string): void {
    cookies().delete(name);
  }
}
