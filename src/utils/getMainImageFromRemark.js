/**
 * 마크다운에서 첫번째 src 속성을 가져온다.
 */
export const getMainImageFromRemark = (html = '') => {
  // 첫번째 캡쳐링 그룹이 URL이 된다
  const result = /src\s*=\s*"(.+?)"/.exec(html)

  return result && result[1].startsWith('http') ? result[1] : ''
}
