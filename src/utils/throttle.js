export default function throttle(delay, callback) {
  var previousCall = new Date().getTime()
  return function() {
    var time = new Date().getTime()

    if (time - previousCall >= delay) {
      // 마지막 호출로부터 delay 이상이 지나야 호출한다.
      previousCall = time
      callback.apply(null, arguments)
    }
  }
}
