/**
 * 디바이스의 촤대 크기
 */
export const deviceMaxWidth = {
  mobile: '480px',
  tablet: '1024px',
  desktop: '1920px',
}

export const media = {
  iPhone5: `@media (max-width: 321px)`, // iPhone5보다 같거나 작은 사이즈에서 적용됨
  mobile: `(min-width: 400px)`,
  Mobile: `@media (min-width: 400px)`,
  phablet: `(min-width: 550px)`,
  Phablet: `@media (min-width: 550px)`,
  tablet: `(min-width: 750px)`,
  Tablet: `@media (min-width: 750px)`,
  desktop: `(min-width: 1020px)`,
  Desktop: `@media (min-width: 1020px)`,
  hd: `(min-width: 1280px)`,
  Hd: `@media (min-width: 1280px)`,

  // media querys for mobile first
  largerThanMobile: `(min-width: ${deviceMaxWidth.mobile})`,
  largerThanTablet: `(min-width: ${deviceMaxWidth.tablet})`,
  largerThanDesktop: `(min-width: ${deviceMaxWidth.desktop})`,

  // media querys for desktop first.
  smallerThanLargeDesktop: `(max-width: ${deviceMaxWidth.desktop})`,
  smallerThanDesktop: `(max-width: ${deviceMaxWidth.tablet})`,
  smallerThanTablet: `(max-width: ${deviceMaxWidth.mobile})`,
}
