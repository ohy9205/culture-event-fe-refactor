import { jest } from "@jest/globals";
import { RenderOptions, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppRouterContextProviderMock } from "./app-router-context-provider-mock";

export default async (
  ui: React.ReactNode,
  options?: Omit<RenderOptions, "queries">
) => {
  const router = {
    back: jest.fn(),
    forward: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  };

  const user = userEvent.setup();

  return {
    user,
    router,
    ...render(
      <AppRouterContextProviderMock router={router}>
        {ui}
      </AppRouterContextProviderMock>,
      options
    ),
  };
};
