module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/**/__tests__/**",
    "!src/**/*.test.ts",
    "!src/**/*.spec.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.ts"],
  testTimeout: 10000,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: ["node_modules/(?!(ethers)/)"],
};
