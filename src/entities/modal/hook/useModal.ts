"use client";

import { ZustandStore } from "@/src/shared/store";
import { ModalState } from "..";

const modalState = new ZustandStore<ModalState>({
  modal: {
    isOpen: false,
    content: null,
  },
});

const useModal = () => {
  const [state, updateState] = modalState.useGlobalState(); // 선언할 때 할당한 context State가 내부에서 자동으로 인자로 들어감

  return {
    data: { ...state.modal },
    open: (modalContent: React.ReactNode) => {
      updateState({ modal: { isOpen: true, content: modalContent } });
      document.body.style.overflow = "hidden";
    },

    close: () => {
      updateState({ modal: { isOpen: false, content: null } });
      document.body.style.overflow = "scroll";
    },
    Provider: modalState.StoreProvider,
  };
};

export default useModal;
