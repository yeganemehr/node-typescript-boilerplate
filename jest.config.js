export default {
  testEnvironment: 'node',
  preset: 'ts-jest/presets/default-esm',
  transform: {
    '^.+\\.m?[tj]s?$': [
      'ts-jest', {
        useESM: true,
        diagnostics: {
          warnOnly: true
        },
        tsconfig: "<rootDir>/tsconfig.test.json"
      }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  moduleFileExtensions: ['ts', 'js'],
  extensionsToTreatAsEsm: ['.ts'],
  testRegex: '/tests/.+\\.test\\.ts$',
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageProvider: "v8",
  coverageReporters: [
    'text',
    'html',
  ],
};
