/**
 * 마크다운에서 첫번째 img 태그의 src 속성을 가져온다.
 */
export const getMainImageFromRemark = (html = '') => {
  const pattern = /src\s*=\s*"(https?.+?[jpg|jpeg|png|gif])"/gs
  const result = pattern.exec(html)
  return result ? result[1] : ''
}
