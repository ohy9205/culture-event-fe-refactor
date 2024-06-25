"use client";

import { useModal } from "@/src/shared/hooks";

type Props = {
  children: React.ReactNode;
};

const ModalProvider = ({ children }: Props) => {
  const { Provider } = useModal();

  return <Provider>{children}</Provider>;
};

export default ModalProvider;
