export type Signin = {
  email: string;
  password: string;
};

export type Signup = {
  email: string;
  nick: string;
  password: string;
  passwordConfirm: string;
};

export type AuthState = {
  auth: {
    isLoggedIn: boolean;
    user: {
      email: string | null;
      nick: string | null;
    };
  };
};
