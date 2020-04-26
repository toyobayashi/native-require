(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.nr = {}));
}(this, (function (exports) { 'use strict';

	

	var nativeRequire;

	if (typeof __webpack_modules__ !== 'undefined') {
	  nativeRequire = typeof __tybys_get_native_require__ === 'function' ? __tybys_get_native_require__() : (function () {
	    return typeof __non_webpack_require__ !== 'undefined' ? __non_webpack_require__ : undefined;
	  })();
	} else {
	  nativeRequire = (function () {
	    return typeof __webpack_modules__ !== 'undefined' ? (typeof __non_webpack_require__ !== 'undefined' ? __non_webpack_require__ : undefined) : (typeof require !== 'undefined' ? require : undefined);
	  })();
	}

	var nativeRequire_2 = nativeRequire;

	var nativeRequire_1 = {
		nativeRequire: nativeRequire_2
	};

	exports.default = nativeRequire_1;
	exports.nativeRequire = nativeRequire_2;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
