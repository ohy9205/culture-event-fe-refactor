import { afterAll, afterEach, jest } from "@jest/globals";
import "@testing-library/jest-dom";

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.resetAllMocks();
});
