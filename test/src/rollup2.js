const { tryGetRequireFunction } = require('../../index.js')
const nativeRequire = tryGetRequireFunction()
console.log(nativeRequire('path').sep)

exports.nativeRequire = nativeRequire
