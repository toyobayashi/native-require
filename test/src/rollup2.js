const { nativeRequire } = require('../../index.js')

console.log(nativeRequire('path').sep)

exports.nativeRequire = nativeRequire
