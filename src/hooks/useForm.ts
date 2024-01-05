import { ChangeEvent, useState } from "react";
import { responseHandler } from "../apis/common/responseHandler";

const useForm = (
  initialValues: Record<string, any>,
  onSubmit: () => any,
  handler: any
) => {
  const [values, setValues] = useState(initialValues);
  const [valid, setValid] = useState("");

  const change = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // submit
  const submit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rs = await onSubmit();

    if (rs) {
      responseHandler(rs, handler);
    }
  };

  return {
    change,
    data: {
      values,
    },
  };
};

export default useForm;
