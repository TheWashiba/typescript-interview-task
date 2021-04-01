import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/src/mocks/style.ts',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};

export default config;
