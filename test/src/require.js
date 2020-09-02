const nr = require('../../index.js')

console.log(nr.tryGetRequireFunction()('path').sep)

module.exports = nr
