import { create } from "zustand";
import { GlobalStoreAdapter } from "./Adapter";

export class ZustandStore<T> implements GlobalStoreAdapter<T> {
  private useStore: any;

  constructor(initialState: T) {
    this.useStore = create((set: any) => ({
      state: initialState,
      updateState: (newState: Partial<T>) =>
        set((prev: T) => ({ ...prev, ...newState })),
    }));
  }
  useGlobalState = () => this.useStore;

  // zustand는 provider 없으므로 Fragment로감싸줌
  StoreProvider = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  };
}
