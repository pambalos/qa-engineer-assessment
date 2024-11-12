module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json'
      }
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
  };
  