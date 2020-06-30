module.exports = {
  entry: 'index.esm.js',
  output: 'dist',
  outputName: 'native-require',
  library: 'nr',
  format: 'umd',
  terserOptions: {
    output: {
      comments: false
    }
  }
}
