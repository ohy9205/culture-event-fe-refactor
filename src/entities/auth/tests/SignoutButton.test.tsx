import { render } from "@/src/__mocks__/lib";
import { screen, waitFor } from "@testing-library/dom";
import { SignoutButton } from "..";

it("로그아웃에 성공하면 '/'페이지로 이동한다", async () => {
  const { user } = await render(<SignoutButton />);

  await user.click(screen.getByText("로그아웃"));

  await waitFor(() => expect(window.location.href).toBe("/"));
});
