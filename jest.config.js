module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|png|jpg|gif|svg|cur)$': '<rootDir>/src/js/__mocks__/fileMock.js',
  },
};
