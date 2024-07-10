"use client";

import { useModal } from "@/src/entities/modal";

type Props = {
  children: React.ReactNode;
};

const ModalProvider = ({ children }: Props) => {
  const { Provider } = useModal();

  return <Provider>{children}</Provider>;
};

export default ModalProvider;
