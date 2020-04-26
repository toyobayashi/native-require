const path = require('path')
const fs = require('fs')
const assert = require('assert')
const webpack = require('webpack')
const rollup = require('rollup')
const { NativeRequireWebpackPlugin } = require('../plugins/webpack')

const outputPath = path.join(__dirname, 'dist')

const webpackPromise = new Promise((resolve, reject) => {
  webpack({
    mode: 'development',
    entry: {
      require: [path.join(__dirname, '/src/require.js')],
      import: [path.join(__dirname, '/src/import.js')],
      variable: [path.join(__dirname, '/src/variable.js')]
    },
    output: {
      path: outputPath,
      filename: '[name].js',
      library: 'globalRequire',
      libraryTarget: 'umd',
      globalObject: 'typeof globalThis !== "undefined" ? globalThis : (typeof window !== "undefined" ? window : (typeof self !== "undefined" ? self : this))'
    },
    plugins: [
      new NativeRequireWebpackPlugin()
    ],
    devtool: 'none'
  }, (err, stats) => {
    if (err) {
      reject(err)
      return
    }
    console.log(stats.toString({ colors: true }))

    const codeRequire = fs.readFileSync(path.join(outputPath, 'require.js'), 'utf8')
    if (codeRequire.match(/path-browserify/) !== null || codeRequire.match(/typeof __non_webpack_require__/) === null) {
      reject(new Error('Output error.'))
      return
    }
    const codeImport = fs.readFileSync(path.join(outputPath, 'import.js'), 'utf8')
    if (codeImport.match(/path-browserify/) !== null || codeImport.match(/typeof __non_webpack_require__/) === null) {
      reject(new Error('Output error.'))
      return
    }
    const codeVariable = fs.readFileSync(path.join(outputPath, 'variable.js'), 'utf8')
    if (codeVariable.match(/path-browserify/) !== null || codeVariable.match(/typeof __non_webpack_require__/) === null) {
      reject(new Error('Output error.'))
      return
    }

    try {
      const srcRequire = require('./src/require.js')
      const distRequire = require('./dist/require.js')
      assert.notStrictEqual(srcRequire.nativeRequire, undefined, 'srcRequire.nativeRequire === undefined')
      assert.notStrictEqual(distRequire.nativeRequire, undefined, 'distRequire.nativeRequire === undefined')
      assert.notStrictEqual(srcRequire.nativeRequire.main, undefined, 'srcRequire.nativeRequire.main === undefined')
      assert.notStrictEqual(distRequire.nativeRequire.main, undefined, 'distRequire.nativeRequire.main === undefined')
      assert.deepEqual(srcRequire.nativeRequire.main, distRequire.nativeRequire.main, 'srcRequire.nativeRequire.main !== distRequire.nativeRequire.main')
    } catch (err) {
      reject(err)
      return
    }

    resolve()
  })
})

const webpackUser = new Promise((resolve, reject) => {
  webpack({
    mode: 'development',
    entry: {
      user: [path.join(__dirname, '/src/user.js')]
    },
    output: {
      path: outputPath,
      filename: '[name].js',
      library: 'globalRequire',
      libraryTarget: 'umd',
      globalObject: 'typeof globalThis !== "undefined" ? globalThis : (typeof window !== "undefined" ? window : (typeof self !== "undefined" ? self : this))'
    },
    devtool: 'none'
  }, (err, stats) => {
    if (err) {
      reject(err)
      return
    }

    const codeUser = fs.readFileSync(path.join(outputPath, 'user.js'), 'utf8')
    if (codeUser.match(/typeof require/) === null) {
      reject(new Error('Output error.'))
      return
    }

    resolve()
  })
})

const rollupPromise = rollup.rollup({
  input: path.join(__dirname, '/src/rollup.js'),
  plugins: [
    require('../plugins/rollup.js').nativeRequireRollupPlugin(),
    require('@rollup/plugin-commonjs')({
      extensions: ['.js']
    })
  ]
}).then(bundle => bundle.write({
  file: path.join(__dirname, 'dist/rollup.js'),
  format: 'umd',
  name: 'nruser',
  exports: 'named'
})).then(() => {
  const codeRollup = fs.readFileSync(path.join(outputPath, 'rollup.js'), 'utf8')
  if (codeRollup.match(/typeof require/) === null) {
    throw new Error('require is replaced by commonjsRequire')
  }
})

Promise.all([webpackPromise, webpackUser, rollupPromise]).then(() => {
  console.log('Test passed')
  process.exit(0)
}).catch(err => {
  console.error(err)
  process.exit(1)
})
