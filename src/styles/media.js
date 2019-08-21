/**
 * 디바이스 최소 크기
 */
export const breakPoint = {
  MOBILE_SMALL: '320px', // iphone 5
  MOBILE_MID: '375px',
  MOBILE_LARGE: '425px',
  TABLET: '768px',
  DESKTOP: '960px',
  LARGEDESKTOP: '1600px',
}

export const media = {
  // media querys for mobile first
  OVER_MOBILE: `@media (min-width: calc(${breakPoint.TABLET}))`,
  OVER_TABLET: `@media (min-width: calc(${breakPoint.DESKTOP}))`,
  OVER_DESKTOP: `@media (min-width: calc(${breakPoint.LARGEDESKTOP} + 1px))`,

  // media querys for desktop first.
  UNDER_LARGE_DESKTOP: `@media (max-width: ${breakPoint.LARGEDESKTOP})`,
  UNDER_DESKTOP: `@media (max-width: ${breakPoint.DESKTOP})`,
  UNDER_TABLET: `@media (max-width: ${breakPoint.TABLET})`,
  UNDER_MOBILE_SMALL: `@media (max-width: ${breakPoint.MOBILE_SMALL})`,
}

export default media
