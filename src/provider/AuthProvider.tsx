"use client";

import { useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { User } from "../types/user";

export const AuthProvider = ({
  children,
  initialValue, // {email, nick, id ...}
}: {
  children: React.ReactNode;
  initialValue?: User;
}) => {
  const initialStatus = useMemo(
    () => ({
      isLoggedIn: true,
      user: {
        email: initialValue?.email || "",
        nick: initialValue?.nick || "",
      },
    }),
    [initialValue]
  );

  const { Provider } = useAuth(initialStatus);

  return <Provider initialState={initialStatus}>{children}</Provider>;
};
