import { ChangeEvent, useState } from "react";

const useForm = (initialValues: Record<string, any>) => {
  const [values, setValues] = useState(initialValues);

  const change = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const reset = () => {
    const keys = Object.keys(values);
    const newValues = keys.reduce(
      (acc, value) => ({ ...acc, [value]: "" }),
      {}
    );
    setValues(newValues);
  };

  return {
    data: {
      values,
    },
    change,
    reset,
  };
};

export default useForm;
