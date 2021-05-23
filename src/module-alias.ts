const moduleAlias = require('module-alias');
const path = require('path');

const rootDir = process.cwd();
const appDir = rootDir + '/build';

export default () => {
  moduleAlias.addAliases({
    '@controllers': path.resolve(`${appDir}/controllers`),
    '@models': path.resolve(`${appDir}/models`),
    '@routes': path.resolve(`${appDir}/routes`),
    '@httpRequestError': path.resolve(`${appDir}/errors/httpRequestError.js`),
  });
};
