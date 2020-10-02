let ParserHelpers
try {
  ParserHelpers = require('webpack/lib/ParserHelpers.js')
} catch (_) {
  ParserHelpers = require('webpack/lib/javascript/JavascriptParserHelpers.js')
}
const NullFactory = require("webpack/lib/NullFactory.js")
const ConstDependency = require('webpack/lib/dependencies/ConstDependency.js')

const __tybys_get_native_require__ = 
`(function () {
  return typeof __webpack_modules__ !== 'undefined' ? (typeof __non_webpack_require__ !== 'undefined' ? __non_webpack_require__ : undefined) : (typeof require !== 'undefined' ? require : undefined);
})`

const GET_NATIVE_REQUIRE_FUNCTION_NAME = '__tybys_get_native_require__'

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
            .for(GET_NATIVE_REQUIRE_FUNCTION_NAME)
            .tap("NativeRequireWebpackPlugin", ParserHelpers.toConstantDependency(parser, __tybys_get_native_require__))
          parser.hooks.expression
            .for(val)
            .tap("NativeRequireWebpackPlugin", () => {
              const code = ParserHelpers.requireFileAsExpression(
                parser.state.module.context,
                require.resolve("..")
              );
              return ParserHelpers.addParsedVariableToModule(parser, val, code)
            })

          parser.hooks.evaluateTypeof
            .for(GET_NATIVE_REQUIRE_FUNCTION_NAME)
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
