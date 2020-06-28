const { nativeRequire } = require('../..')

console.log(nativeRequire('path').sep)

exports.nativeRequire = nativeRequire
