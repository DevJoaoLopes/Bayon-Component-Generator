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
};