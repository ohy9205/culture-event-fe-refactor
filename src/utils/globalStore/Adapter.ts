export interface GlobalStoreAdapter<T> {
  // 1. state사용함수. state와 state를 변경하는 함수를 반환함
  useGlobalState: () => [T, (newState: Partial<T>) => void];
  // 2. provider제공
  StoreProvider: ({
    children,
  }: {
    children: React.ReactNode;
  }) => React.ReactNode;
}
