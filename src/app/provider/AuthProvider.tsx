"use client";

import { AuthState } from "@/src/entities/auth";
import { ZustandStore } from "@/src/shared/store";

type Props = {
  children: React.ReactNode;
  initialValue?: AuthState;
};

export const authStore = new ZustandStore<AuthState>({
  auth: {
    isLoggedIn: false,
    user: {
      email: null,
      nick: null,
    },
  },
});

const AuthProvider = ({ children, initialValue }: Props) => {
  return (
    <authStore.StoreProvider initialState={initialValue}>
      {children}
    </authStore.StoreProvider>
  );
};

export default AuthProvider;
