import { tryGetRequireFunction } from '../..'
const nativeRequire = tryGetRequireFunction()
console.log(nativeRequire('path').sep)

export { nativeRequire }
