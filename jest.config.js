const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // alias 사용중이라 tsconfig.js의 compilerOptions.paths와 매칭시켜줌
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  // jest문법 사용을 도와주는 확장 셋업
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
