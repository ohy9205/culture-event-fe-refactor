import { expect, it, jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import useForm from "../useForm";

it("훅에 initialValues 인자를 전달하면 form의 초기값으로 설정된다.", () => {
  const {
    result: { current },
  } = renderHook(() => useForm({ name: "해연", gender: "여성" }));

  expect(current.data.form).toEqual({ name: "해연", gender: "여성" });
});

it("훅의 changeForm 함수를 호출하면 form에 인자로 받은 데이터가 누적해서 추가된다", () => {
  const { result } = renderHook(() => useForm({ name: "", gender: "" }));

  let changeFormSpy = jest.spyOn(result.current, "changeForm");

  act(() => result.current.changeForm("name", "해연"));
  expect(changeFormSpy).toHaveBeenCalledWith("name", "해연");
  expect(result.current.data.form).toEqual({ name: "해연", gender: "" });

  changeFormSpy = jest.spyOn(result.current, "changeForm");

  act(() => result.current.changeForm("gender", "여성"));
  expect(changeFormSpy).toHaveBeenCalledTimes(1);
  expect(changeFormSpy).toHaveBeenCalledWith("gender", "여성");
  expect(result.current.data.form).toEqual({ name: "해연", gender: "여성" });
});

it("훅의 reset함수를 호출하면 form이 initialValues로 초기화된다", () => {
  const { result } = renderHook(() => useForm({ name: "", gender: "" }));

  jest.spyOn(result.current, "changeForm");

  act(() => result.current.changeForm("name", "해연"));
  expect(result.current.data.form).toEqual({ name: "해연", gender: "" });

  const resetSpy = jest.spyOn(result.current, "reset");

  act(() => result.current.reset());
  expect(resetSpy).toHaveBeenCalledTimes(1);
  expect(result.current.data.form).toEqual({ name: "", gender: "" });
});
