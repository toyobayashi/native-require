module.exports = {
  entry: 'index.js',
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
