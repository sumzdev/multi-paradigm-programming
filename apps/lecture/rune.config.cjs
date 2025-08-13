/**
 * @type {import('@rune-ts/server').RuneConfigType}
 */
module.exports = {
  port: 7000,
  hostname: 'localhost',
  mode: 'render',
  clientEntry: './src/app/client/index.ts',
  serverEntry: './src/app/server/index.ts',
  watchToReloadPaths: ['../../packages'],
  watchToIgnorePaths: ['**/.env.*', '*.json'],
};
