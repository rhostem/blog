/**
 * UTF-8 형식 문자열의 바이트 크기 계산
 * UTF-8 문자는 1바이트부터 4바이트를 사용하며 범위별로 다른 비트 패턴을 사용한다.
 *
 * 유니코드 문자를 UTF-8 형식으로 표현할 때
 * 7비트로 표현 가능한 U+0000 ~ U+007F 에 해당하는 문자는 1바이트,
 * 11비트 표현 가능한 U+0080 ~ U+07FF 에 해당하는 문자는 2바이트,
 * 16비트 표현 가능한 U+0800 ~ U+FFFF 에 해당하는 문자는 3바이트,
 * 를 각각 사용한다.
 * (4바이트로 표현되는 문자는 거의 사용되지 않으므로 무시한다)
 *
 * 특정 문자의 유니코드 코드값을 charCodeAt으로 가져온 후
 * 비트 shift 연산을 이용해서 해당 문자의 비트 크기를 확인해서 UTF-8로 표현되는 바이트 크기를 계산한다.
 *
 * 참조)
 * https://ko.wikipedia.org/wiki/UTF-8
 * http://programmingsummaries.tistory.com/239
 * https://gist.github.com/mathiasbynens/1010324
 */
export default function getByteSize(s: string = '') {
  const str = s.toString()
  let byteSize = 0
  let char = ''

  for (let i = 0; !isNaN(str.charCodeAt(i)); i++) {
    char = str.charCodeAt(i)

    // 12비트 이상으로 표현 가능한 유니코드
    if (char >> 11) {
      byteSize += 3

      // 8비트 ~ 11비트로 표현 가능한 유니코드
    } else if (char >> 7) {
      byteSize += 2

      // 7비트 이하로 표현 가능한 유니코드
    } else {
      byteSize += 1
    }
  }

  return byteSize
}
