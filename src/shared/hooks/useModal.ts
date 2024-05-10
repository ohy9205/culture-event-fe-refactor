"use client";

import { useRef } from "react";
import ZustandSingletone from "../../utils/globalStore/ZustandSingletone";

type State = {
  isOpen: boolean;
  activeModalId: string | null;
};

const useModal = () => {
  const modalState = ZustandSingletone.create<State>("modal", {
    isOpen: false,
    activeModalId: null,
  });
  const [state, updateState] = modalState.useGlobalState(); // 선언할 때 할당한 context State가 내부에서 자동으로 인자로 들어감
  const modalRef = useRef<string | null>(null); // 모달의 고유한 id를 생성

  if (modalRef.current === null) {
    modalRef.current = Math.random().toString(36).substring(2, 9); // 난수를 36진수로 변환해서 9자리 단위로 절삭함
  }

  return {
    data: { ...state, modalId: modalRef.current },
    open: (modalId: string) => {
      updateState({ isOpen: true, activeModalId: modalId });
    },
    close: () => {
      modalRef.current = null;
      updateState({ isOpen: false, activeModalId: null });
    },
    Provider: modalState.StoreProvider,
  };
};

export default useModal;
