import { deleteObjectKeys, objectToQueryString, replaceObjectKey } from "..";

it("인자로 받은 key값에 해당하는 데이터를 변경한다", () => {
  const obj = {
    a: "1",
    b: "2",
    c: "3",
  };
  const resultObj = replaceObjectKey(obj, "b", "test");

  expect(resultObj).toEqual({ a: "1", b: "test", c: "3" });
});

it("인자로 받은 key배열에 해당하는 데이터들을 삭제한다", () => {
  const obj = {
    a: "1",
    b: "2",
    c: "3",
  };
  expect(deleteObjectKeys(obj, ["a"])).toEqual({ b: "2", c: "3" });
  expect(deleteObjectKeys(obj, ["b", "c"])).toEqual({ a: "1" });
});

it("인자로 받은 구분자를 이용해 객체를 쿼리 스트링으로 변경한다.", () => {
  const obj = {
    name: "yeon",
    age: "29",
    gender: "female",
  };

  expect(objectToQueryString(obj, "&")).toEqual(
    "name=yeon&age=29&gender=female"
  );
});
