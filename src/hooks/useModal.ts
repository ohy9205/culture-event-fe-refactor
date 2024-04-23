import { ContextStore } from "../utils/globalStore/ContextSotre";

type Context = {
  isOpen: boolean;
};

const modalState = new ContextStore<Context>({
  isOpen: false,
});

export const useModal = () => {
  const [state, updateState] = modalState.useGlobalState(); // 선언할 때 할당한 context State가 내부에서 자동으로 인자로 들어감
  return {
    data: { isOpen: state.isOpen },
    open: () => updateState({ isOpen: true }),
    close: () => updateState({ isOpen: false }),
    Provider: modalState.StoreProvider,
  };
};
