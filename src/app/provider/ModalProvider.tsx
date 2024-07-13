"use client";

import { ModalState } from "@/src/entities/modal";
import { ZustandStore } from "@/src/shared/store";

type Props = {
  children: React.ReactNode;
};

export const modalStore = new ZustandStore<ModalState>({
  modal: {
    isOpen: false,
    content: null,
  },
});

const ModalProvider = ({ children }: Props) => {
  return <modalStore.StoreProvider>{children}</modalStore.StoreProvider>;
};

export default ModalProvider;
