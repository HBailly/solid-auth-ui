const { pathsToModuleNameMapper } = require('ts-jest');
const config = require('../../../webpack/config');
const {
  compilerOptions: { paths = {}, baseUrl = './' },
} = require('../../../tsconfig.json');

module.exports = {
  rootDir: '../../../',
  roots: ['<rootDir>', `<rootDir>/${baseUrl}`, `<rootDir>/src/test/javascript/spec/app/`],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageDirectory: '<rootDir>/target/test-results/',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/test/javascript/',
    '<rootDir>/src/main/webapp/app/router',
    '.*.json',
  ],
  moduleFileExtensions: ['js', 'json', 'ts', 'vue'],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.(j|t)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@rdfjs|@generated|shex-methods)/)"
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/main/webapp/app/$1',
    ...pathsToModuleNameMapper(paths, { prefix: `<rootDir>/${baseUrl}/` }),
  },
  reporters: ['default', ['jest-junit', {
    outputDirectory: './target/test-results/',
    outputName: 'TESTS-results-jest.xml'
  }]],
  testResultsProcessor: 'jest-sonar-reporter',
  testMatch: ['<rootDir>/src/test/javascript/spec/**/@(*.)@(spec.ts)'],
  snapshotSerializers: ['jest-serializer-vue'],
  globals: {
    SERVER_API_URL: config.serverApiUrl,
    VERSION: config.version,
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 60,
      functions: 70,
      lines: 80,
    },
  },
};
