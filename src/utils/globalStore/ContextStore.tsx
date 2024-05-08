"use client";

import { createContext, useContext, useState } from "react";
import GlobalStoreAdapter from "./Adapter";

class ContextStore<T> implements GlobalStoreAdapter<T> {
  private Context: React.Context<[T, (newState: Partial<T>) => void]>;

  // context를 생성함. state 정보, 타입들은 외부에서 받음(제네릭사용)
  constructor(private initialState: T) {
    this.Context = createContext<[T, (newState: Partial<T>) => void]>([
      this.initialState,
      () => null,
    ]);
  }

  useGlobalState = () => useContext(this.Context);

  StoreProvider = ({
    children,
    initialState,
  }: {
    children: React.ReactNode;
    initialState?: T;
  }) => {
    // 생성자에서 받은 initialState를 useState의 초기 값으로 사용
    const [state, setState] = useState<T>(initialState || this.initialState);

    const updateState = (newState: Partial<T>) => {
      setState((prevState) => ({ ...prevState, ...newState }));
    };

    return (
      <this.Context.Provider value={[state, updateState]}>
        {children}
      </this.Context.Provider>
    );
  };
}

export default ContextStore;
