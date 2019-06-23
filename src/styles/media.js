/**
 * 디바이스의 촤대 크기
 */
export const breakPoint = {
  IPHONE5: '320px',
  MOBILE: '480px',
  TABLET: '1024px',
  DESKTOP: '1600px',
  LARGEDESKTOP: '1920px',
}

export const media = {
  // media querys for mobile first
  OVER_IPHONE5: `@media (min-width: calc(${breakPoint.IPHONE5} + 1px))`,
  OVER_MOBILE: `@media (min-width: calc(${breakPoint.MOBILE} + 1px))`,
  OVER_TABLET: `@media (min-width: calc(${breakPoint.TABLET} + 1px))`,
  OVER_DESKTOP: `@media (min-width: calc(${breakPoint.DESKTOP} + 1px))`,

  // media querys for desktop first.
  UNDER_LARGE_DESKTOP: `@media (max-width: ${breakPoint.LARGEDESKTOP})`,
  UNDER_DESKTOP: `@media (max-width: ${breakPoint.DESKTOP})`,
  UNDER_TABLET: `@media (max-width: ${breakPoint.TABLET})`,
  UNDER_IPHONE5: `@media (max-width: ${breakPoint.IPHONE5})`,
}

export default media
