import { cookies } from "next/headers";
import LocalStoreAdapter from "./LocalStoreAdapter";

class Cookie implements LocalStoreAdapter {
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

export default Cookie;
