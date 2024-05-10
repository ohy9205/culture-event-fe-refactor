"use client";

import useAuth from "../../shared/hooks/useAuth";
import { User } from "../../shared/types/user";

type Props = {
  children: React.ReactNode;
  initialValue?: User;
};

const AuthProvider = ({
  children,
  initialValue, // {email, nick, id ...}
}: Props) => {
  const initialState = initialValue
    ? {
        isLoggedIn: true,
        user: {
          email: initialValue?.email,
          nick: initialValue?.nick,
        },
      }
    : undefined;

  const { Provider } = useAuth(initialState);

  return <Provider initialState={initialState}>{children}</Provider>;
};

export default AuthProvider;
