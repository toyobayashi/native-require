# native-require

Export native require function. It can be ignored by webpack preprocessing and avoid bundling webpack Node.js polyfills.

``` bash
$ npm install @tybys/native-require
```

## When should you use this package

If you want to write a library which supports both Node.js and browser, and you hope it can be work well with webpack, you can use this package instead of writing `__non_webpack_require__` directly in your code.

## Usage:

### Webpack

Plugin is **not** neccesary.

``` js
const { NativeRequireWebpackPlugin } = require('@tybys/native-require/plugins/webpack.js')

module.exports = {
  /* ... */
  plugins: [
    new NativeRequireWebpackPlugin({
      variable: '__tybys_native_require__' // this is default value
    })
  ]
}
```

CommonJS:

``` js
const { nativeRequire } = require('@tybys/native-require/index.js')
if (typeof nativeRequire === 'function') {
  // ...
}
```

ESM format input / TypeScript:

``` ts
import { nativeRequire } from '@tybys/native-require/index'
if (typeof nativeRequire === 'function') {
  // ...
}
```

or use injected variable specified in plugin option.

``` js
const { nativeRequire } = __tybys_native_require__
if (typeof nativeRequire === 'function') {
  // ...
}
```

### Rollup

**NOTE**: If you are using commonjs `require('@tybys/native-require')` with `@rollup/plugin-commonjs` and it's major version is less than `12`, you need add `@tybys/native-require/plugins/rollup.js`.

``` js
const { nativeRequireRollupPlugin } = require('@tybys/native-require/plugins/rollup.js')

module.exports = {
  plugins: [
    nativeRequireRollupPlugin(),
    /* commonjs node-resolve ... */
  ]
}
```

``` js
const { nativeRequire } = require('@tybys/native-require')
```

ESM / TypeScript:

``` js
import { nativeRequire } from '@tybys/native-require'
if (typeof nativeRequire === 'function') {
  // ...
}
```

### Browser (Generally do not use) / Electron renderer process

``` html
<script src="node_modules/@tybys/native-require/dist/native-require.js"></script>
<script>
  (function () {
    var nativeRequire = nr.nativeRequire;
    if (typeof nativeRequire === 'function') {
      // ...
    }
  })();
</script>
```

Examples are in `test` folder.
