exports.nativeRequireRollupPlugin = function () {
  return {
    name: 'native-require',
    renderChunk (code /*, chunk, options */) {
      return code.replace(/function\s+commonjsRequire\s+\(\)\s+\{\s*(\r?\n)*\s*throw new Error\(['"]Dynamic requires are not currently supported by @rollup\/plugin-commonjs['"]\);\s*(\r?\n)*\s*\}/g, '')
        .replace(/function\s+commonjsRequire\s+\((.+?)\)\s+\{\s*(\r?\n)*\s*throw new Error\(['"]Could not dynamically require ['"](.+?)\);\s*(\r?\n)*\s*\}/g, '')
        .replace(/commonjsRequire/g, 'require')
    }
  }
}
