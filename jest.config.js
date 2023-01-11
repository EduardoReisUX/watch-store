module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  collectCoverageFrom: [
    "<rootDir>/src/components/**/*.tsx",
    "<rootDir>/src/pages/**/*.tsx",
    "<rootDir>/src/hooks/**/*.{ts,tsx}",
    "!<rootDir>/src/pages/**/{_app,_document}.tsx",
  ],
};
