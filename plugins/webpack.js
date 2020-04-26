const ParserHelpers = require('webpack/lib/ParserHelpers.js')
const NullFactory = require("webpack/lib/NullFactory.js")
const ConstDependency = require('webpack/lib/dependencies/ConstDependency.js')

const __tybys_get_native_require__ = 
`(function () {
  return typeof __webpack_require__ === 'function' ? (typeof __non_webpack_require__ !== 'undefined' ? __non_webpack_require__ : undefined) : (typeof require !== 'undefined' ? require : undefined);
})`

class NativeRequireWebpackPlugin {
  constructor (options) {
    this._options = {
      ...({
        variable: '__tybys_native_require__'
      }),
      ...(Object.prototype.toString.call(options) === '[object Object]' ? options : {})
    }
  }
  apply (compiler) {
    const val = this._options.variable
    compiler.hooks.compilation.tap(
			"NativeRequireWebpackPlugin",
			(compilation, { normalModuleFactory }) => {
				compilation.dependencyFactories.set(ConstDependency, new NullFactory())
				compilation.dependencyTemplates.set(
					ConstDependency,
					new ConstDependency.Template()
        )

				const handler = parser => {
          parser.hooks.expression
            .for("__tybys_get_native_require__")
            .tap("NativeRequireWebpackPlugin", ParserHelpers.toConstantDependency(parser, __tybys_get_native_require__))
          parser.hooks.expression
            .for(val)
            .tap("NativeRequireWebpackPlugin", () => {
              const code = ParserHelpers.requireFileAsExpression(
                parser.state.module.context,
                require.resolve("../index-webpack.js")
              );
              return ParserHelpers.addParsedVariableToModule(parser, val, code)
            })

          parser.hooks.evaluateTypeof
            .for('__tybys_get_native_require__')
            .tap("NativeRequireWebpackPlugin", ParserHelpers.evaluateToString('function'))
          parser.hooks.evaluateTypeof
            .for(val)
            .tap("NativeRequireWebpackPlugin", ParserHelpers.evaluateToString('object'))
				}

				normalModuleFactory.hooks.parser
					.for("javascript/auto")
					.tap("NativeRequireWebpackPlugin", handler)
				normalModuleFactory.hooks.parser
					.for("javascript/dynamic")
					.tap("NativeRequireWebpackPlugin", handler)
				normalModuleFactory.hooks.parser
					.for("javascript/esm")
          .tap("NativeRequireWebpackPlugin", handler)
      }
    )
  }
}

exports.NativeRequireWebpackPlugin = NativeRequireWebpackPlugin
