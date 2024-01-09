import { useState } from "react";

const useForm = (initialValues: Record<string, any>) => {
  const [form, setForm] = useState(initialValues);
  const [valid, setValid] = useState("");

  const changeForm = (name: string, value: any) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    const keys = Object.keys(form);
    const newValues = keys.reduce(
      (acc, value) => ({ ...acc, [value]: "" }),
      {}
    );
    setForm(newValues);
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
