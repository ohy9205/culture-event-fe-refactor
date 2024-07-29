import { render } from "@/src/__mocks__/lib";
import { screen } from "@testing-library/dom";
import { MyInfo } from "..";

jest.mock("../../auth/hooks/useAuth", () => () => ({
  data: { user: { email: "test@test.com", nick: "yeon" } },
}));

it("로그인중인 유저 이메일과 닉네임이 보여진다.", async () => {
  await render(<MyInfo />);

  expect(screen.getByText("email: test@test.com")).toBeInTheDocument();

  expect(screen.getByText("nickname: yeon")).toBeInTheDocument();
});
