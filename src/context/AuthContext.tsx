import { createContext, useContext, useState } from "react";

const initialValue = {
  state: {
    isLoggedIn: false,
    user: {
      email: "",
      nick: "",
    },
  },
  onChangeAuth: (
    isLoggedIn: boolean,
    user: {
      email: string;
      nick: string;
    }
  ) => {},
};

const AuthContext = createContext(initialValue);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState(initialValue.state);

  const onChangeAuth = (
    isLoggedIn: boolean,
    user: { email: string; nick: string }
  ) => {
    setAuth({ isLoggedIn, user });
  };

  return (
    <AuthContext.Provider value={{ state: auth, onChangeAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
