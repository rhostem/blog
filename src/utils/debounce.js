export default function debounce(wait, cb, immediate) {
  var timeout
  return function() {
    var context = this,
      args = arguments
    var later = function() {
      timeout = null
      if (!immediate) cb.apply(context, args)
    }
    var callNow = immediate && !timeout // immediate가 true일 경우 최초 호출시 즉시 실행됨. 그 다음 호출부터는 debounce 적용.
    clearTimeout(timeout) // wait만큼의 시간이 지나지 않으면 clearTimeout 때문에 later가 실행되지 않음.
    timeout = setTimeout(later, wait)
    if (callNow) cb.apply(context, args)
  }
}
