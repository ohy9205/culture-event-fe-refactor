import { afterAll, afterEach, beforeAll, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { server } from "./__mocks__/server";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});

afterAll(() => {
  server.close();
  jest.resetAllMocks();
  jest.useRealTimers();
});
