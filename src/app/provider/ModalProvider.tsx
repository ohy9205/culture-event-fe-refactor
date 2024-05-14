"use client";

import useModal from "../../shared/hooks/useModal";

type Props = {
  children: React.ReactNode;
};

const ModalProvider = ({ children }: Props) => {
  const { Provider } = useModal();

  return <Provider>{children}</Provider>;
};

export default ModalProvider;