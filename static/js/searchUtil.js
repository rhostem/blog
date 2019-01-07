/**
 * UMD module deinitions for node.js and browser
 */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(null /* ['d'] */, factory)
  } else if (typeof module === 'object' && module.exports) {
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(/* d */)
  } else {
    // Browser globals (root is window)
    root.searchUtil = factory(/* d */)
  }
})(this, function(/* d */) {
  const IDENTIFIER = '@_' // 워드맵 키 앞에 붙일 식별자. 예약어와 충돌 방지를 위함
  const ROUTES = 'r'

  // worker 메시지에서 사용할 action
  const actions = {
    SEARCH_WORKER_READY: 'SEARCH_WORKER_READY',
    SEARCH_REQUEST: 'SEARCH_REQUEST',
    SEARCH_SUCCESS: 'SEARCH_SUCCESS',
    GET_ROUTE_TITLE_MAP: 'GET_ROUTE_TITLE_MAP',
    GET_ROUTE_TITLE_MAP_SUCCESS: 'GET_ROUTE_TITLE_MAP_SUCCESS',
  }

  return {
    IDENTIFIER: IDENTIFIER,
    ROUTES: ROUTES,
    actions,

    /**
     * 단어에서 불필요한 문자열 제거
     */
    trimText: function(str = '') {
      return str
        .toLowerCase()
        .replace(/\.|\s{1,}|\n|\r|,|\(|\)/g, ' ')
        .replace(/'|"|\{|\}|\[|\]/g, '')
    },

    /**
     * 단어 키
     */
    getKey: function getKey(w) {
      return `${IDENTIFIER}${w}`
    },

    getTagRoute: function getTagRoute(tag = '') {
      return `/tag/${tag.replace(/\s+/g, '_').toLowerCase()}`
    },
  }
})
