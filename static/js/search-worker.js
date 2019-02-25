/* global R */

/**
 * npm run dev:worker
 */
var wordList = []
var routeMap = {}
var wordMap = {}
var tagList = []
;(function init() {
  importScripts('//cdn.jsdelivr.net/npm/ramda@latest/dist/ramda.min.js')
  importScripts('./searchUtil.js')

  fetch('/search/searchIndex.json')
    .then(function(res) {
      return res.json()
    })
    .then(function(searchIndex) {
      wordList = searchIndex.wordList
      routeMap = searchIndex.routeMap
      wordMap = searchIndex.wordMap
      tagList = searchIndex.tagList

      postMessage({
        action: searchUtil.actions.SEARCH_WORKER_READY,
        payload: {},
      })
    })
})()

/**
 * event listener for postMessage
 *
 * postMessage({
 *  action: string,
 *  payload: any
 * })
 */
onmessage = function onmessage(e) {
  var action = e.data.action
  var payload = e.data.payload

  switch (action) {
    case searchUtil.actions.SEARCH_REQUEST:
      search(payload.searchInput)
      break

    case searchUtil.actions.GET_ROUTE_TITLE_MAP:
      getRouteTitleMap(payload)
      break

    default:
      break
  }
}

function isEng(str) {
  return /^[A-Za-z]*$/.test(str)
}

function getMinSearchLen(str) {
  return isEng(str) ? 2 : 1
}

/**
 * 문자열의 길이가 충분한지 확인. 영어는 2글자 이상. 한글은 1글자
 */
function isTooShort() {
  var str =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ''

  var minLen = getMinSearchLen(str)
  return str.length < minLen
}

function search() {
  var search =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ''

  if (!search) {
    sendNoResult()
    return
  }

  if (search && isTooShort(search)) {
    sendNoResult()
    return
  }

  var minSearchLen = getMinSearchLen(search)
  var searchWords = searchUtil.trimText(search).split(/\s+/)
  var resultRouteMap = {}
  var resultTagRouteList = []

  var _iteratorNormalCompletion = true
  var _didIteratorError = false
  var _iteratorError = undefined

  try {
    for (
      var _iterator = searchWords[Symbol.iterator](), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      var searchWord = _step.value

      if (searchWord.length >= minSearchLen) {
        // 검색어가 단어와 매칭되는지 확인
        var _iteratorNormalCompletion2 = true
        var _didIteratorError2 = false
        var _iteratorError2 = undefined

        try {
          for (
            var _iterator2 = wordList[Symbol.iterator](), _step2;
            !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
            _iteratorNormalCompletion2 = true
          ) {
            var word = _step2.value

            // 검색어는 인덱싱된 단어의 시작 부분부터 매칭되어야 한다
            if (word.match('^' + searchWord)) {
              resultRouteMap = addMatchingRoutes(
                resultRouteMap,
                wordMap[searchUtil.getKey(word)][searchUtil.ROUTES],
                search
              )
            }
          }

          // 검색어가 태그와 매칭되는지
        } catch (err) {
          _didIteratorError2 = true
          _iteratorError2 = err
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return()
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2
            }
          }
        }

        var _iteratorNormalCompletion3 = true
        var _didIteratorError3 = false
        var _iteratorError3 = undefined

        try {
          for (
            var _iterator3 = tagList[Symbol.iterator](), _step3;
            !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
            _iteratorNormalCompletion3 = true
          ) {
            var tag = _step3.value

            if (tag.toLowerCase().match('^' + searchWord)) {
              resultTagRouteList.push(addMatchingTagToRoute(tag))
            }
          }
        } catch (err) {
          _didIteratorError3 = true
          _iteratorError3 = err
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return()
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3
            }
          }
        }
      }
    }

    // 결과가 없으면 단어를 1글자씩 줄여서 한번 검색한다.
  } catch (err) {
    _didIteratorError = true
    _iteratorError = err
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return()
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError
      }
    }
  }

  if (R.and(R.isEmpty(resultRouteMap), R.isEmpty(resultTagRouteList))) {
    // 단어를 더 이상 줄일 수 없으면 결과 없음 전송
    if (
      R.all(function(s) {
        return s.length < minSearchLen
      }, searchWords)
    ) {
      sendNoResult()
    }

    // 단어를 1글자씩 줄여서 한번 더 검색
    this.search(
      searchWords
        .map(function(s) {
          return R.take(s.length - 1, s)
        })
        .join(' ')
    )
  } else {
    // onmessage 이벤트에서 전달받을 수 있도록 메시지 전달
    sendResult({
      resultPostRoutes: convertResultToList(resultRouteMap),
      resultTagRoutes: R.uniqBy(function(tagRoute) {
        return tagRoute.name
      }, resultTagRouteList),
    })
  }
}

function sendNoResult() {
  sendResult({
    resultPostRoutes: [],
    resultTagRoutes: [],
  })
}

var sendResult = function sendResult(_ref) {
  var resultPostRoutes = _ref.resultPostRoutes,
    resultTagRoutes = _ref.resultTagRoutes,
    searchTime = _ref.searchTime

  postMessage({
    action: searchUtil.actions.SEARCH_SUCCESS,
    payload: {
      resultPostRoutes: resultPostRoutes,
      resultTagRoutes: resultTagRoutes,
      searchTime: searchTime,
    },
  })
}

var increasePoint = function increasePoint(_ref2) {
  var resultRouteMap = _ref2.resultRouteMap,
    routeId = _ref2.routeId,
    amount = _ref2.amount

  return R.assocPath(
    [routeId, 'point'],
    R.path([routeId, 'point'], resultRouteMap) + amount,
    resultRouteMap
  )
}

var addMatchingRoutes = function addMatchingRoutes() {
  var resultRouteMap =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
  var matchingRoutes =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : []
  var search =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ''

  matchingRoutes.forEach(function() {
    var routeId =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0

    var matchingData = routeMap[routeId]

    if (!resultRouteMap[routeId]) {
      // 추가되어 있지 않다면 새로 추가한다. 기본 point는 1
      resultRouteMap[routeId] = {
        data: matchingData,
        point: 1,
      }
    } else {
      // 이미 추가되어 있다면 point를 증가시킨다.
      resultRouteMap = increasePoint({
        resultRouteMap: resultRouteMap,
        routeId: routeId,
        amount: 1,
      })
    }

    // 검색 제목에 포함되어 있다면 포인트 추가한다.
    if (
      matchingData.title.split(' ').filter(function(w) {
        return w.match('^' + search)
      }).length > 0
    ) {
      resultRouteMap = increasePoint({
        resultRouteMap: resultRouteMap,
        routeId: routeId,
        amount: 10,
      })
    }

    // 태그에 포함되어 있다면 포인트 추가한다.
    if (
      matchingData.tags.filter(function(t) {
        return t.toLowerCase().match('^' + search)
      }).length > 0
    ) {
      resultRouteMap = increasePoint({
        resultRouteMap: resultRouteMap,
        routeId: routeId,
        amount: 5,
      })
    }
  })

  return resultRouteMap
}

var addMatchingTagToRoute = function addMatchingTagToRoute() {
  var tag =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ''

  return { name: tag, route: searchUtil.getTagRoute(tag) }
}

/**
 * 결과 라우트 맵을 배열로 변환하고, point로 정렬한다.
 */
var convertResultToList = function convertResultToList() {
  var resultPostRoutes =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}

  var routeIds = Object.keys(resultPostRoutes)
  var sortedRoutes = R.pipe(
    R.map(function(routeId) {
      return resultPostRoutes[routeId]
    }),
    R.sort(function(a, b) {
      return b.point - a.point
    })
  )(routeIds)

  return sortedRoutes
}

/**
 * 라우트(key)-타이틀(value) 객체를 반환
 */
function getRouteTitleMap(payload) {
  var routeTitleMap = {}
  var routeMapKeys = Object.keys(routeMap)

  routeMapKeys.forEach(function(key) {
    routeTitleMap[routeMap[key].route] = routeMap[key].title
  })

  postMessage({
    action: searchUtil.actions.GET_ROUTE_TITLE_MAP_SUCCESS,
    payload: {
      routeTitleMap: routeTitleMap,
    },
  })
}
