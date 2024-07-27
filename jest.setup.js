import "@testing-library/jest-dom";
import "whatwg-fetch";
import { server } from "./src/__mocks__/node";

jest.mock("next/image", () => ({ src, alt }) => {
  return <img src={src} alt={alt} />;
});

jest.mock("@/src/shared/components/StaticMap", () => () => (
  <div>Static Map</div>
));

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

Object.defineProperty(global, "location", {
  value: {
    href: "",
    replace: jest.fn((url) => {}),
  },
});
