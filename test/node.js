module.exports = function () {
  const _require = require('../index.js').tryGetRequireFunction(module)
  _require('../package.json')
  return module.children.length
}
