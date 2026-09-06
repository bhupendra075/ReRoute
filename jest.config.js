export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^react-leaflet$': '<rootDir>/src/tests/mocks/react-leaflet.jsx',
    '^leaflet$': '<rootDir>/src/tests/mocks/leaflet.js',
    '^qrcode.react$': '<rootDir>/src/tests/mocks/qrcode-react.jsx',
  },
  coverageThreshold: {
    global: { branches: 0, functions: 0, lines: 0, statements: 0 },
  },
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/**/*.d.ts', '!src/main.jsx'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};