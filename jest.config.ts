export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^react-leaflet$': '<rootDir>/src/tests/mocks/react-leaflet.tsx',
    '^leaflet$': '<rootDir>/src/tests/mocks/leaflet.ts',
    '^qrcode.react$': '<rootDir>/src/tests/mocks/qrcode-react.tsx',
  },
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 80, statements: 80 },
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/main.tsx'],
}
