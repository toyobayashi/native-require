(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.nr = {}));
}(this, (function (exports) { 'use strict';

  var nativeRequire = (function getRequireFunction (parentModule) {
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

    if (typeof nativeRequire === 'function') {
      var g = (function (defaultValue) {
        var g;
        g = (function () { return this; })(); // non-strict mode
      
        try {
          g = g || new Function("return this")(); // allow eval
        } catch (_) {
          if (typeof globalThis !== "undefined") return globalThis;
          if (typeof __webpack_modules__ === "undefined") {
            if (typeof global !== "undefined") return global;
          }
          if (typeof window !== "undefined") return window;
          if (typeof self !== "undefined") return self;
        }
      
        return g || defaultValue;
      })();
      if (!(g && g.process && g.process.versions && typeof g.process.versions.node === 'string')) {
        return nativeRequire;
      }

      if (nativeRequire === g.require) {
        return nativeRequire;
      }

      var Module;
      try {
        Module = nativeRequire('module');
      } catch (_) {
        return nativeRequire;
      }

      Module = Module || Module.Module;
      if (!Module || !(parentModule instanceof Module)) {
        return nativeRequire;
      }

      if (typeof Module.createRequire === 'function') {
        return Module.createRequire(parentModule.filename);
      }

      if (typeof Module.createRequireFromPath === 'function') {
        return Module.createRequireFromPath(parentModule.filename);
      }

      return (function makeRequireFunction (mod, main) {
        var Module = mod.constructor;
        function require (path) {
          return mod.require(path);
        }
        function validateString (value, name) {
          if (typeof value !== 'string') throw new TypeError('The "' + name + '" argument must be of type string. Received type ' + typeof value);
        }

        function resolve (request, opts) {
          validateString(request, 'request');
          return Module._resolveFilename(request, mod, false, opts);
        }

        require.resolve = resolve;

        function paths (request) {
          validateString(request, 'request');
          return Module._resolveLookupPaths(request, mod);
        }

        resolve.paths = paths;

        require.main = main;
        require.extensions = Module._extensions;
        require.cache = Module._cache;

        return require;
      })(parentModule, (g.process.mainModule instanceof Module) ? g.process.mainModule : undefined);
    }

    return nativeRequire;
  })();

  exports.nativeRequire = nativeRequire;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
