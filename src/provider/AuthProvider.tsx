"use client";

import { useAuth } from "../hooks/useAuth";
import { AuthStatus } from "../types/user";

export const AuthProvider = ({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState?: AuthStatus;
}) => {
  const { Provider } = useAuth();

  return <Provider initialState={initialState}>{children}</Provider>;
};
