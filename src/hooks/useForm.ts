import { useState } from "react";

const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [form, setForm] = useState(initialValues);
  const [valid, setValid] = useState("");

  const changeForm = (name: string, value: any) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setForm(initialValues);
  };

  return {
    data: {
      form,
      valid,
    },
    setValid,
    changeForm,
    reset,
  };
};

export default useForm;
