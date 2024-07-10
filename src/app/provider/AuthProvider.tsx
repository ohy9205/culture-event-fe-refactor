"use client";

import { AuthState, useAuth } from "@/src/entities/auth";

type Props = {
  children: React.ReactNode;
  initialValue?: AuthState;
};

const AuthProvider = ({ children, initialValue }: Props) => {
  const { Provider } = useAuth();

  return <Provider initialState={initialValue}>{children}</Provider>;
};

export default AuthProvider;
