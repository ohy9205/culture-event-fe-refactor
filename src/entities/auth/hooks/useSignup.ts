"use client";

import { useForm } from "@/src/shared/hooks";
import { APIResponse } from "@/src/shared/types";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent } from "react";
import { Signup } from "../types";
import useAuth from "./useAuth";

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
        success: () => {
          alert("회원가입에 성공했습니다.");
          router.push("/signin");
        },
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
