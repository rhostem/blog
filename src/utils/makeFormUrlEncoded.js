/**
 * 객체를 application/x-www-form-urlencoded 컨텐츠 타입으로 변환한다
 * @param {*} obj
 */
const makeFormUrlEncoded = data => {
  const encoded = Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')

  return encoded
}

export default makeFormUrlEncoded
