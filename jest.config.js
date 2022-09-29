module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/test-helpers/setupTests.ts'],
  testMatch: ['**/?(*.)+(test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^test-helpers/(.*)$': '<rootDir>/test-helpers/$1',
  },
  // moduleDirectories: ['node_modules', 'src', 'test-helpers'],
  // globals: {
  //   'ts-jest': {
  //     tsconfig: '<rootDir>/tsconfig.test.json',
  //   },
  // },
};
