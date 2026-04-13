/** @type {import('jest').Config} */
module.exports = {
  displayName: 'shared',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: 'libs/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/shared',
  testEnvironment: 'jsdom',
};
