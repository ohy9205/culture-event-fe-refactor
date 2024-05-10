"use client";

import { SWRConfig } from "swr";

type Props = { children: React.ReactNode };

const SWRProvider = ({ children }: Props) => {
  return <SWRConfig>{children}</SWRConfig>;
};

export default SWRProvider;
