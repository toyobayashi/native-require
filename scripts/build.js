const { rollup } = require('rollup')
const config = require('./config')

const { terser } = require('rollup-plugin-terser')
// const rollupCommonJS = require('@rollup/plugin-commonjs')

// const { nativeRequireRollupPlugin } = require('../plugins/rollup')

const p = function (...args) {
  return require('path').join(__dirname, '..', ...args)
}

function getRollupConfig (minify) {
  const outputFilename = minify ? p(config.output, `${config.outputName}.min.js`) : p(config.output, `${config.outputName}.js`)
  const format = config.format != null ? config.format : 'umd'
  return {
    input: {
      input: p(config.entry),
      plugins: [
        // nativeRequireRollupPlugin(),
        // rollupCommonJS({
        //   extensions: ['.js']
        // }),
        ...(minify ? [terser({
          ...(config.terserOptions || {}),
          module: (config.terserOptions && config.terserOptions.module) || (['es', 'esm', 'module']).includes(format)
        })] : [])
      ]
    },
    output: {
      file: outputFilename,
      format: format,
      name: config.library,
      exports: 'named'
    }
  }
}

const rc = [getRollupConfig(false), getRollupConfig(true)]
rc.map(conf => rollup(conf.input).then(bundle => bundle.write(conf.output)))
