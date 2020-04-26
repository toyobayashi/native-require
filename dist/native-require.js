(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.nr = {}));
}(this, (function (exports) { 'use strict';

	

	/** @type {((id: string) => any) | undefined} */
	var nativeRequire_1 = (function () {
	  return typeof __webpack_require__ === 'function' ? (typeof __non_webpack_require__ !== 'undefined' ? __non_webpack_require__ : undefined) : (typeof require !== 'undefined' ? require : undefined);
	})();

	var nativeRequire = {
		nativeRequire: nativeRequire_1
	};

	exports.default = nativeRequire;
	exports.nativeRequire = nativeRequire_1;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
