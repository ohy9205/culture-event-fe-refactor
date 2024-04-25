"use client";

import React from "react";
import { create } from "zustand";
import { GlobalStoreAdapter } from "./Adapter";

type State<T> = { state: T; updateState: (newState: Partial<T>) => void };

export class ZustandStore<T> implements GlobalStoreAdapter<T> {
  private useStore; // zustnad Create타입이 됨

  constructor(initialState: T) {
    this.useStore = create<State<T>>((set: any) => ({
      state: initialState,
      updateState: (newState: Partial<T>) =>
        set((prevState: State<T>) => {
          return {
            ...prevState.updateState,
            state: { ...prevState.state, ...newState },
          };
        }),
    }));
  }

  useGlobalState = (): [T, (newState: Partial<T>) => void] => {
    const state = this.useStore((state: State<T>) => ({
      state: state.state,
      updateState: state.updateState,
    }));
    return [state.state, state.updateState];
  };

  // zustand는 provider 없으므로 Fragment로감싸줌
  StoreProvider = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  };
}
