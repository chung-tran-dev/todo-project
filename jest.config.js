/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "jsdom",
  // testEnvironment: 'jest-fixed-jsdom',
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  "bail": 1,
  "verbose": true
};