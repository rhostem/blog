'use strict';

/**
 * npm run dev:worker
 */

var wordList = [];
var routeMap = {};
var wordMap = {};
var tagList = [];(function init() {
  importScripts('//cdn.jsdelivr.net/npm/ramda@latest/dist/ramda.min.js');
  importScripts('./searchUtil.js');

  fetch('/search/searchIndex.json').then(function (res) {
    return res.json();
  }).then(function (searchIndex) {
    wordList = searchIndex.wordList;
    routeMap = searchIndex.routeMap;
    wordMap = searchIndex.wordMap;
    tagList = searchIndex.tagList;

    postMessage({
      action: searchUtil.actions.SEARCH_WORKER_READY,
      payload: {}
    });
  });
})();

/**
 * event listener for postMessage
 *
 * postMessage({
 *  action: string,
 *  payload: any
 * })
 */
onmessage = function onmessage(e) {
  var action = e.data.action;
  var payload = e.data.payload;

  switch (action) {
    case searchUtil.actions.SEARCH_REQUEST:
      search(payload.searchInput);
      break;

    case searchUtil.actions.GET_ROUTE_TITLE_MAP:
      getRouteTitleMap(payload);
      break;

    default:
      break;
  }
};

function isEng(str) {
  return (/^[A-Za-z]*$/.test(str)
  );
}

function getMinSearchLen(str) {
  return isEng(str) ? 2 : 1;
}

/**
 * 문자열의 길이가 충분한지 확인. 영어는 2글자 이상. 한글은 1글자
 */
function isTooShort() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var minLen = getMinSearchLen(str);
  return str.length < minLen;
}

function search() {
  var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (!search) {
    sendNoResult();
    return;
  }

  if (search && isTooShort(search)) {
    sendNoResult();
    return;
  }

  var minSearchLen = getMinSearchLen(search);
  var searchWords = searchUtil.trimText(search).split(/\s+/);
  var resultRouteMap = {};
  var resultTagRouteList = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = searchWords[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var searchWord = _step.value;

      if (searchWord.length >= minSearchLen) {
        // 검색어가 단어와 매칭되는지 확인
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = wordList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var word = _step2.value;

            // 검색어는 인덱싱된 단어의 시작 부분부터 매칭되어야 한다
            if (word.match('^' + searchWord)) {
              resultRouteMap = addMatchingRoutes(resultRouteMap, wordMap[searchUtil.getKey(word)][searchUtil.ROUTES], search);
            }
          }

          // 검색어가 태그와 매칭되는지
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = tagList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var tag = _step3.value;

            if (tag.toLowerCase().match('^' + searchWord)) {
              resultTagRouteList.push(addMatchingTagToRoute(tag));
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    }

    // 결과가 없으면 단어를 1글자씩 줄여서 한번 검색한다.
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (R.and(R.isEmpty(resultRouteMap), R.isEmpty(resultTagRouteList))) {
    // 단어를 더 이상 줄일 수 없으면 결과 없음 전송
    if (R.all(function (s) {
      return s.length < minSearchLen;
    }, searchWords)) {
      sendNoResult();
    }

    // 단어를 1글자씩 줄여서 한번 더 검색
    this.search(searchWords.map(function (s) {
      return R.take(s.length - 1, s);
    }).join(' '));
  } else {
    // onmessage 이벤트에서 전달받을 수 있도록 메시지 전달
    sendResult({
      resultPostRoutes: convertResultToList(resultRouteMap),
      resultTagRoutes: R.uniqBy(function (tagRoute) {
        return tagRoute.name;
      }, resultTagRouteList)
    });
  }
}

function sendNoResult() {
  sendResult({
    resultPostRoutes: [],
    resultTagRoutes: []
  });
}

var sendResult = function sendResult(_ref) {
  var resultPostRoutes = _ref.resultPostRoutes,
      resultTagRoutes = _ref.resultTagRoutes,
      searchTime = _ref.searchTime;

  postMessage({
    action: searchUtil.actions.SEARCH_SUCCESS,
    payload: {
      resultPostRoutes: resultPostRoutes,
      resultTagRoutes: resultTagRoutes,
      searchTime: searchTime
    }
  });
};

var increasePoint = function increasePoint(_ref2) {
  var resultRouteMap = _ref2.resultRouteMap,
      routeId = _ref2.routeId,
      amount = _ref2.amount;

  return R.assocPath([routeId, 'point'], R.path([routeId, 'point'], resultRouteMap) + amount, resultRouteMap);
};

var addMatchingRoutes = function addMatchingRoutes() {
  var resultRouteMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var matchingRoutes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var search = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  matchingRoutes.forEach(function () {
    var routeId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var matchingData = routeMap[routeId];

    if (!resultRouteMap[routeId]) {
      // 추가되어 있지 않다면 새로 추가한다. 기본 point는 1
      resultRouteMap[routeId] = {
        data: matchingData,
        point: 1
      };
    } else {
      // 이미 추가되어 있다면 point를 증가시킨다.
      resultRouteMap = increasePoint({
        resultRouteMap: resultRouteMap,
        routeId: routeId,
        amount: 1
      });
    }

    // 검색 제목에 포함되어 있다면 포인트 추가한다.
    if (matchingData.title.split(' ').filter(function (w) {
      return w.match('^' + search);
    }).length > 0) {
      resultRouteMap = increasePoint({ resultRouteMap: resultRouteMap, routeId: routeId, amount: 10 });
    }

    // 태그에 포함되어 있다면 포인트 추가한다.
    if (matchingData.tags.filter(function (t) {
      return t.toLowerCase().match('^' + search);
    }).length > 0) {
      resultRouteMap = increasePoint({ resultRouteMap: resultRouteMap, routeId: routeId, amount: 5 });
    }
  });

  return resultRouteMap;
};

var addMatchingTagToRoute = function addMatchingTagToRoute() {
  var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return { name: tag, route: searchUtil.getTagRoute(tag) };
};

/**
 * 결과 라우트 맵을 배열로 변환하고, point로 정렬한다.
 */
var convertResultToList = function convertResultToList() {
  var resultPostRoutes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var routeIds = Object.keys(resultPostRoutes);
  var sortedRoutes = R.pipe(R.map(function (routeId) {
    return resultPostRoutes[routeId];
  }), R.sort(function (a, b) {
    return b.point - a.point;
  }))(routeIds);

  return sortedRoutes;
};

/**
 * 라우트(key)-타이틀(value) 객체를 반환
 */
function getRouteTitleMap(payload) {
  var routeTitleMap = {};
  var routeMapKeys = Object.keys(routeMap);

  routeMapKeys.forEach(function (key) {
    routeTitleMap[routeMap[key].route] = routeMap[key].title;
  });

  postMessage({
    action: searchUtil.actions.GET_ROUTE_TITLE_MAP_SUCCESS,
    payload: {
      routeTitleMap: routeTitleMap
    }
  });
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlYXJjaC9zZWFyY2gtd29ya2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFJQSxJQUFJLFdBQVcsRUFBZjtBQUNBLElBQUksV0FBVyxFQUFmO0FBQ0EsSUFBSSxVQUFVLEVBQWQ7QUFDQSxJQUFJLFVBQVUsRUFBZCxDQUNDLENBQUMsU0FBUyxJQUFULEdBQWdCO0FBQ2hCLGdCQUFjLHVEQUFkO0FBQ0EsZ0JBQWMsaUJBQWQ7O0FBRUEsb0NBQ0csSUFESCxDQUNRO0FBQUEsV0FBTyxJQUFJLElBQUosRUFBUDtBQUFBLEdBRFIsRUFFRyxJQUZILENBRVEsdUJBQWU7QUFDbkIsZUFBVyxZQUFZLFFBQXZCO0FBQ0EsZUFBVyxZQUFZLFFBQXZCO0FBQ0EsY0FBVSxZQUFZLE9BQXRCO0FBQ0EsY0FBVSxZQUFZLE9BQXRCOztBQUVBLGdCQUFZO0FBQ1YsY0FBUSxXQUFXLE9BQVgsQ0FBbUIsbUJBRGpCO0FBRVYsZUFBUztBQUZDLEtBQVo7QUFJRCxHQVpIO0FBYUQsQ0FqQkE7O0FBbUJEOzs7Ozs7OztBQVFBLFlBQVksbUJBQVMsQ0FBVCxFQUFZO0FBQ3RCLE1BQUksU0FBUyxFQUFFLElBQUYsQ0FBTyxNQUFwQjtBQUNBLE1BQUksVUFBVSxFQUFFLElBQUYsQ0FBTyxPQUFyQjs7QUFFQSxVQUFRLE1BQVI7QUFDRSxTQUFLLFdBQVcsT0FBWCxDQUFtQixjQUF4QjtBQUNFLGFBQU8sUUFBUSxXQUFmO0FBQ0E7O0FBRUYsU0FBSyxXQUFXLE9BQVgsQ0FBbUIsbUJBQXhCO0FBQ0UsdUJBQWlCLE9BQWpCO0FBQ0E7O0FBRUY7QUFDRTtBQVZKO0FBWUQsQ0FoQkQ7O0FBa0JBLFNBQVMsS0FBVCxDQUFlLEdBQWYsRUFBb0I7QUFDbEIsU0FBTyxlQUFjLElBQWQsQ0FBbUIsR0FBbkI7QUFBUDtBQUNEOztBQUVELFNBQVMsZUFBVCxDQUF5QixHQUF6QixFQUE4QjtBQUM1QixTQUFPLE1BQU0sR0FBTixJQUFhLENBQWIsR0FBaUIsQ0FB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VUE7OztBQUdBLFNBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBdUM7QUFDckMsTUFBSSxnQkFBZ0IsRUFBcEI7QUFDQSxNQUFJLGVBQWUsT0FBTyxJQUFQLENBQVksUUFBWixDQUFuQjs7QUFFQSxlQUFhLE9BQWIsQ0FBcUIsZUFBTztBQUMxQixrQkFBYyxTQUFTLEdBQVQsRUFBYyxLQUE1QixJQUFxQyxTQUFTLEdBQVQsRUFBYyxLQUFuRDtBQUNELEdBRkQ7O0FBSUEsY0FBWTtBQUNWLFlBQVEsV0FBVyxPQUFYLENBQW1CLDJCQURqQjtBQUVWLGFBQVM7QUFDUDtBQURPO0FBRkMsR0FBWjtBQU1EIiwiZmlsZSI6InNlYXJjaC13b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIG5wbSBydW4gZGV2OndvcmtlclxuICovXG5cbnZhciB3b3JkTGlzdCA9IFtdXG52YXIgcm91dGVNYXAgPSB7fVxudmFyIHdvcmRNYXAgPSB7fVxudmFyIHRhZ0xpc3QgPSBbXVxuOyhmdW5jdGlvbiBpbml0KCkge1xuICBpbXBvcnRTY3JpcHRzKCcvL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL3JhbWRhQGxhdGVzdC9kaXN0L3JhbWRhLm1pbi5qcycpXG4gIGltcG9ydFNjcmlwdHMoJy4vc2VhcmNoVXRpbC5qcycpXG5cbiAgZmV0Y2goYC9zZWFyY2gvc2VhcmNoSW5kZXguanNvbmApXG4gICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgLnRoZW4oc2VhcmNoSW5kZXggPT4ge1xuICAgICAgd29yZExpc3QgPSBzZWFyY2hJbmRleC53b3JkTGlzdFxuICAgICAgcm91dGVNYXAgPSBzZWFyY2hJbmRleC5yb3V0ZU1hcFxuICAgICAgd29yZE1hcCA9IHNlYXJjaEluZGV4LndvcmRNYXBcbiAgICAgIHRhZ0xpc3QgPSBzZWFyY2hJbmRleC50YWdMaXN0XG5cbiAgICAgIHBvc3RNZXNzYWdlKHtcbiAgICAgICAgYWN0aW9uOiBzZWFyY2hVdGlsLmFjdGlvbnMuU0VBUkNIX1dPUktFUl9SRUFEWSxcbiAgICAgICAgcGF5bG9hZDoge30sXG4gICAgICB9KVxuICAgIH0pXG59KSgpXG5cbi8qKlxuICogZXZlbnQgbGlzdGVuZXIgZm9yIHBvc3RNZXNzYWdlXG4gKlxuICogcG9zdE1lc3NhZ2Uoe1xuICogIGFjdGlvbjogc3RyaW5nLFxuICogIHBheWxvYWQ6IGFueVxuICogfSlcbiAqL1xub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xuICB2YXIgYWN0aW9uID0gZS5kYXRhLmFjdGlvblxuICB2YXIgcGF5bG9hZCA9IGUuZGF0YS5wYXlsb2FkXG5cbiAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICBjYXNlIHNlYXJjaFV0aWwuYWN0aW9ucy5TRUFSQ0hfUkVRVUVTVDpcbiAgICAgIHNlYXJjaChwYXlsb2FkLnNlYXJjaElucHV0KVxuICAgICAgYnJlYWtcblxuICAgIGNhc2Ugc2VhcmNoVXRpbC5hY3Rpb25zLkdFVF9ST1VURV9USVRMRV9NQVA6XG4gICAgICBnZXRSb3V0ZVRpdGxlTWFwKHBheWxvYWQpXG4gICAgICBicmVha1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrXG4gIH1cbn1cblxuZnVuY3Rpb24gaXNFbmcoc3RyKSB7XG4gIHJldHVybiAvXltBLVphLXpdKiQvLnRlc3Qoc3RyKVxufVxuXG5mdW5jdGlvbiBnZXRNaW5TZWFyY2hMZW4oc3RyKSB7XG4gIHJldHVybiBpc0VuZyhzdHIpID8gMiA6IDFcbn1cblxuLyoqXG4gKiDrrLjsnpDsl7TsnZgg6ri47J206rCAIOy2qeu2hO2VnOyngCDtmZXsnbguIOyYgeyWtOuKlCAy6riA7J6QIOydtOyDgS4g7ZWc6riA7J2AIDHquIDsnpBcbiAqL1xuZnVuY3Rpb24gaXNUb29TaG9ydChzdHIgPSAnJykge1xuICB2YXIgbWluTGVuID0gZ2V0TWluU2VhcmNoTGVuKHN0cilcbiAgcmV0dXJuIHN0ci5sZW5ndGggPCBtaW5MZW5cbn1cblxuZnVuY3Rpb24gc2VhcmNoKHNlYXJjaCA9ICcnKSB7XG4gIGlmICghc2VhcmNoKSB7XG4gICAgc2VuZE5vUmVzdWx0KClcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChzZWFyY2ggJiYgaXNUb29TaG9ydChzZWFyY2gpKSB7XG4gICAgc2VuZE5vUmVzdWx0KClcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBtaW5TZWFyY2hMZW4gPSBnZXRNaW5TZWFyY2hMZW4oc2VhcmNoKVxuICB2YXIgc2VhcmNoV29yZHMgPSBzZWFyY2hVdGlsLnRyaW1UZXh0KHNlYXJjaCkuc3BsaXQoL1xccysvKVxuICB2YXIgcmVzdWx0Um91dGVNYXAgPSB7fVxuICB2YXIgcmVzdWx0VGFnUm91dGVMaXN0ID0gW11cblxuICBmb3IgKHZhciBzZWFyY2hXb3JkIG9mIHNlYXJjaFdvcmRzKSB7XG4gICAgaWYgKHNlYXJjaFdvcmQubGVuZ3RoID49IG1pblNlYXJjaExlbikge1xuICAgICAgLy8g6rKA7IOJ7Ja06rCAIOuLqOyWtOyZgCDrp6Tsua3rkJjripTsp4Ag7ZmV7J24XG4gICAgICBmb3IgKHZhciB3b3JkIG9mIHdvcmRMaXN0KSB7XG4gICAgICAgIC8vIOqygOyDieyWtOuKlCDsnbjrjbHsi7HrkJwg64uo7Ja07J2YIOyLnOyekSDrtoDrtoTrtoDthLAg66ek7Lmt65CY7Ja07JW8IO2VnOuLpFxuICAgICAgICBpZiAod29yZC5tYXRjaChgXiR7c2VhcmNoV29yZH1gKSkge1xuICAgICAgICAgIHJlc3VsdFJvdXRlTWFwID0gYWRkTWF0Y2hpbmdSb3V0ZXMoXG4gICAgICAgICAgICByZXN1bHRSb3V0ZU1hcCxcbiAgICAgICAgICAgIHdvcmRNYXBbc2VhcmNoVXRpbC5nZXRLZXkod29yZCldW3NlYXJjaFV0aWwuUk9VVEVTXSxcbiAgICAgICAgICAgIHNlYXJjaFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyDqsoDsg4nslrTqsIAg7YOc6re47JmAIOunpOy5reuQmOuKlOyngFxuICAgICAgZm9yICh2YXIgdGFnIG9mIHRhZ0xpc3QpIHtcbiAgICAgICAgaWYgKHRhZy50b0xvd2VyQ2FzZSgpLm1hdGNoKGBeJHtzZWFyY2hXb3JkfWApKSB7XG4gICAgICAgICAgcmVzdWx0VGFnUm91dGVMaXN0LnB1c2goYWRkTWF0Y2hpbmdUYWdUb1JvdXRlKHRhZykpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyDqsrDqs7zqsIAg7JeG7Jy866m0IOuLqOyWtOulvCAx6riA7J6Q7JSpIOykhOyXrOyEnCDtlZzrsogg6rKA7IOJ7ZWc64ukLlxuICBpZiAoUi5hbmQoUi5pc0VtcHR5KHJlc3VsdFJvdXRlTWFwKSwgUi5pc0VtcHR5KHJlc3VsdFRhZ1JvdXRlTGlzdCkpKSB7XG4gICAgLy8g64uo7Ja066W8IOuNlCDsnbTsg4Eg7KSE7J28IOyImCDsl4bsnLzrqbQg6rKw6rO8IOyXhuydjCDsoITshqFcbiAgICBpZiAoUi5hbGwocyA9PiBzLmxlbmd0aCA8IG1pblNlYXJjaExlbiwgc2VhcmNoV29yZHMpKSB7XG4gICAgICBzZW5kTm9SZXN1bHQoKVxuICAgIH1cblxuICAgIC8vIOuLqOyWtOulvCAx6riA7J6Q7JSpIOykhOyXrOyEnCDtlZzrsogg642UIOqygOyDiVxuICAgIHRoaXMuc2VhcmNoKHNlYXJjaFdvcmRzLm1hcChzID0+IFIudGFrZShzLmxlbmd0aCAtIDEsIHMpKS5qb2luKCcgJykpXG4gIH0gZWxzZSB7XG4gICAgLy8gb25tZXNzYWdlIOydtOuypO2KuOyXkOyEnCDsoITri6zrsJvsnYQg7IiYIOyeiOuPhOuhnSDrqZTsi5zsp4Ag7KCE64usXG4gICAgc2VuZFJlc3VsdCh7XG4gICAgICByZXN1bHRQb3N0Um91dGVzOiBjb252ZXJ0UmVzdWx0VG9MaXN0KHJlc3VsdFJvdXRlTWFwKSxcbiAgICAgIHJlc3VsdFRhZ1JvdXRlczogUi51bmlxQnkodGFnUm91dGUgPT4gdGFnUm91dGUubmFtZSwgcmVzdWx0VGFnUm91dGVMaXN0KSxcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHNlbmROb1Jlc3VsdCgpIHtcbiAgc2VuZFJlc3VsdCh7XG4gICAgcmVzdWx0UG9zdFJvdXRlczogW10sXG4gICAgcmVzdWx0VGFnUm91dGVzOiBbXSxcbiAgfSlcbn1cblxudmFyIHNlbmRSZXN1bHQgPSAoeyByZXN1bHRQb3N0Um91dGVzLCByZXN1bHRUYWdSb3V0ZXMsIHNlYXJjaFRpbWUgfSkgPT4ge1xuICBwb3N0TWVzc2FnZSh7XG4gICAgYWN0aW9uOiBzZWFyY2hVdGlsLmFjdGlvbnMuU0VBUkNIX1NVQ0NFU1MsXG4gICAgcGF5bG9hZDoge1xuICAgICAgcmVzdWx0UG9zdFJvdXRlcyxcbiAgICAgIHJlc3VsdFRhZ1JvdXRlcyxcbiAgICAgIHNlYXJjaFRpbWUsXG4gICAgfSxcbiAgfSlcbn1cblxudmFyIGluY3JlYXNlUG9pbnQgPSAoeyByZXN1bHRSb3V0ZU1hcCwgcm91dGVJZCwgYW1vdW50IH0pID0+IHtcbiAgcmV0dXJuIFIuYXNzb2NQYXRoKFxuICAgIFtyb3V0ZUlkLCAncG9pbnQnXSxcbiAgICBSLnBhdGgoW3JvdXRlSWQsICdwb2ludCddLCByZXN1bHRSb3V0ZU1hcCkgKyBhbW91bnQsXG4gICAgcmVzdWx0Um91dGVNYXBcbiAgKVxufVxuXG52YXIgYWRkTWF0Y2hpbmdSb3V0ZXMgPSAoXG4gIHJlc3VsdFJvdXRlTWFwID0ge30sXG4gIG1hdGNoaW5nUm91dGVzID0gW10sXG4gIHNlYXJjaCA9ICcnXG4pID0+IHtcbiAgbWF0Y2hpbmdSb3V0ZXMuZm9yRWFjaCgocm91dGVJZCA9IDApID0+IHtcbiAgICB2YXIgbWF0Y2hpbmdEYXRhID0gcm91dGVNYXBbcm91dGVJZF1cblxuICAgIGlmICghcmVzdWx0Um91dGVNYXBbcm91dGVJZF0pIHtcbiAgICAgIC8vIOy2lOqwgOuQmOyWtCDsnojsp4Ag7JWK64uk66m0IOyDiOuhnCDstpTqsIDtlZzri6QuIOq4sOuzuCBwb2ludOuKlCAxXG4gICAgICByZXN1bHRSb3V0ZU1hcFtyb3V0ZUlkXSA9IHtcbiAgICAgICAgZGF0YTogbWF0Y2hpbmdEYXRhLFxuICAgICAgICBwb2ludDogMSxcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8g7J2066+4IOy2lOqwgOuQmOyWtCDsnojri6TrqbQgcG9pbnTrpbwg7Kad6rCA7Iuc7YKo64ukLlxuICAgICAgcmVzdWx0Um91dGVNYXAgPSBpbmNyZWFzZVBvaW50KHtcbiAgICAgICAgcmVzdWx0Um91dGVNYXAsXG4gICAgICAgIHJvdXRlSWQsXG4gICAgICAgIGFtb3VudDogMSxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8g6rKA7IOJIOygnOuqqeyXkCDtj6ztlajrkJjslrQg7J6I64uk66m0IO2PrOyduO2KuCDstpTqsIDtlZzri6QuXG4gICAgaWYgKFxuICAgICAgbWF0Y2hpbmdEYXRhLnRpdGxlLnNwbGl0KCcgJykuZmlsdGVyKHcgPT4gdy5tYXRjaChgXiR7c2VhcmNofWApKS5sZW5ndGggPlxuICAgICAgMFxuICAgICkge1xuICAgICAgcmVzdWx0Um91dGVNYXAgPSBpbmNyZWFzZVBvaW50KHsgcmVzdWx0Um91dGVNYXAsIHJvdXRlSWQsIGFtb3VudDogMTAgfSlcbiAgICB9XG5cbiAgICAvLyDtg5zqt7jsl5Ag7Y+s7ZWo65CY7Ja0IOyeiOuLpOuptCDtj6zsnbjtirgg7LaU6rCA7ZWc64ukLlxuICAgIGlmIChcbiAgICAgIG1hdGNoaW5nRGF0YS50YWdzLmZpbHRlcih0ID0+IHQudG9Mb3dlckNhc2UoKS5tYXRjaChgXiR7c2VhcmNofWApKVxuICAgICAgICAubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgcmVzdWx0Um91dGVNYXAgPSBpbmNyZWFzZVBvaW50KHsgcmVzdWx0Um91dGVNYXAsIHJvdXRlSWQsIGFtb3VudDogNSB9KVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gcmVzdWx0Um91dGVNYXBcbn1cblxudmFyIGFkZE1hdGNoaW5nVGFnVG9Sb3V0ZSA9ICh0YWcgPSAnJykgPT4ge1xuICByZXR1cm4geyBuYW1lOiB0YWcsIHJvdXRlOiBzZWFyY2hVdGlsLmdldFRhZ1JvdXRlKHRhZykgfVxufVxuXG4vKipcbiAqIOqysOqzvCDrnbzsmrDtirgg66e17J2EIOuwsOyXtOuhnCDrs4DtmZjtlZjqs6AsIHBvaW5066GcIOygleugrO2VnOuLpC5cbiAqL1xudmFyIGNvbnZlcnRSZXN1bHRUb0xpc3QgPSAocmVzdWx0UG9zdFJvdXRlcyA9IHt9KSA9PiB7XG4gIHZhciByb3V0ZUlkcyA9IE9iamVjdC5rZXlzKHJlc3VsdFBvc3RSb3V0ZXMpXG4gIHZhciBzb3J0ZWRSb3V0ZXMgPSBSLnBpcGUoXG4gICAgUi5tYXAocm91dGVJZCA9PiByZXN1bHRQb3N0Um91dGVzW3JvdXRlSWRdKSxcbiAgICBSLnNvcnQoKGEsIGIpID0+IGIucG9pbnQgLSBhLnBvaW50KVxuICApKHJvdXRlSWRzKVxuXG4gIHJldHVybiBzb3J0ZWRSb3V0ZXNcbn1cblxuLyoqXG4gKiDrnbzsmrDtirgoa2V5KS3tg4DsnbTti4AodmFsdWUpIOqwneyytOulvCDrsJjtmZhcbiAqL1xuZnVuY3Rpb24gZ2V0Um91dGVUaXRsZU1hcChwYXlsb2FkOiB7fSkge1xuICB2YXIgcm91dGVUaXRsZU1hcCA9IHt9XG4gIHZhciByb3V0ZU1hcEtleXMgPSBPYmplY3Qua2V5cyhyb3V0ZU1hcClcblxuICByb3V0ZU1hcEtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgIHJvdXRlVGl0bGVNYXBbcm91dGVNYXBba2V5XS5yb3V0ZV0gPSByb3V0ZU1hcFtrZXldLnRpdGxlXG4gIH0pXG5cbiAgcG9zdE1lc3NhZ2Uoe1xuICAgIGFjdGlvbjogc2VhcmNoVXRpbC5hY3Rpb25zLkdFVF9ST1VURV9USVRMRV9NQVBfU1VDQ0VTUyxcbiAgICBwYXlsb2FkOiB7XG4gICAgICByb3V0ZVRpdGxlTWFwLFxuICAgIH0sXG4gIH0pXG59XG4iXX0=