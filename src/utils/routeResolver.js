const SITE_CONFIG = require('../../site-config')

/**
 * UMD module deinitions for node.js and browser
 */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(null, factory)
  } else if (typeof module === 'object' && module.exports) {
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory()
  } else {
    // Browser globals (root is window)
    root.searchUtil = factory()
  }
})(this, function() {
  return {
    /**
     * 포스트 경로
     */
    getPostRoute: function(path) {
      return `${SITE_CONFIG.pathPrefix}posts/${path}`
    },
    /**
     * 태그 경로
     * 태그 문자열의 공백 문자는 underscore로 대체한다.
     */
    getTagRoute: function(tag) {
      return `/tag/${tag.replace(/\s+/g, '_').toLowerCase()}`
    },
  }
})
