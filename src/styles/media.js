/**
 * 디바이스의 촤대 크기
 */
export const deviceMaxWidth = {
  mobile: '480px',
  tablet: '1024px',
  desktop: '1600px',
  largeDesktop: '1920px',
}

export const media = {
  iPhone5: `@media (max-width: 321px)`, // iPhone5보다 같거나 작은 사이즈에서 적용됨

  // media querys for mobile first
  overMobile: `@media (min-width: ${deviceMaxWidth.mobile})`,
  overTablet: `@media (min-width: ${deviceMaxWidth.tablet})`,
  overDesktop: `@media (min-width: ${deviceMaxWidth.desktop})`,

  // media querys for desktop first.
  underLargeDesktop: `@media (max-width: ${deviceMaxWidth.largeDesktop})`,
  underDesktop: `@media (max-width: ${deviceMaxWidth.desktop})`,
  underTablet: `@media (max-width: ${deviceMaxWidth.tablet})`,
}

export default media
