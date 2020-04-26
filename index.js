/** @type {((id: string) => any) | undefined} */
exports.nativeRequire = (function () {
  return typeof __webpack_require__ === 'function' ? (typeof __non_webpack_require__ !== 'undefined' ? __non_webpack_require__ : undefined) : (typeof require !== 'undefined' ? require : undefined);
})();
