let nr

if (typeof __webpack_require__ === 'function') {
  nr = require('../../index-webpack.js')
} else {
  nr = require('../../index.js')
}

console.log(nr.nativeRequire('path').sep)

module.exports = nr
