window.fbAsyncInit = function() {
  FB.init({
    appId: '288159445071059',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v3.1',
  })
}
;(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) {
    return
  }
  js = d.createElement(s)
  js.id = id
  js.src = 'https://connect.facebook.net/ko_KR/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
})(document, 'script', 'facebook-jssdk')
