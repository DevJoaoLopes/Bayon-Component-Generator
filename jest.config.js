/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': ['ts-jest'],
  },
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/__tests__/**/*.ts'],
  transformIgnorePatterns: ['/node_modules/', '/__mocks__/vscode.js'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 95,
    },
  },
  coveragePathIgnorePatterns: ['index.ts'],
};