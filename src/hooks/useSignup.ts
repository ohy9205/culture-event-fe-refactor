"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent } from "react";
import { Signup } from "../types/APIRequest";
import { APIResponse } from "../types/APIResponse";
import { useAuth } from "./useAuth";
import useForm from "./useForm";

const useSignup = () => {
  const {
    data: { form, valid },
    changeForm,
    setValid,
  } = useForm<Signup>({
    email: "",
    nick: "",
    password: "",
    passwordConfirm: "",
  });
  const { signup } = useAuth();
  const router = useRouter();

  const validPasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    if (!checkPasswordConfirm(form.password, e.target.value)) {
      setValid("비밀번호가 일치하지 않습니다");
    } else {
      setValid("");
    }
  };

  return {
    data: {
      form,
      valid,
    },
    changeForm,
    validPasswordConfirm,
    validForm: checkForm,
    signup: (e: FormEvent) => {
      e.preventDefault();

      if (!checkForm(form)) {
        return;
      }

      signup(form, {
        success: () => router.push("/signin"),
        status403: (rs: APIResponse<{}>) => {
          setValid(rs.message);
        },
        status409: (rs: APIResponse<{}>) => {
          setValid(rs.message);
        },
      });
    },
  };
};

const checkForm = (form: Signup) => {
  const isValidPassword = checkPasswordConfirm(
    form.password,
    form.passwordConfirm
  );
  const isValidFormContent = Object.values(form).every((value) => value !== "");
  if (isValidPassword && isValidFormContent) {
    return true;
  } else {
    return false;
  }
};

const checkPasswordConfirm = (password: string, confirm: string) => {
  if (password !== confirm) {
    return false;
  } else {
    return true;
  }
};

export default useSignup;
