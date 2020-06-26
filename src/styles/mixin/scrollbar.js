import { css } from 'styled-components'

const scrollbar = ({
  width = 0, // 세로 스크롤바
  height = 0, // 가로 스크롤바
  trackColor = '#eee',
  thunmbColor = '#ddd',
  radius = 0,
} = {}) => {
  return css`
    &::-webkit-scrollbar {
      width: ${width};
      height: ${height};
      &:hover {
        cursor: pointer;
      }
    }
    &::-webkit-scrollbar-track {
      background-color: ${trackColor};
      border-radius: ${radius};
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${thunmbColor};
      border-radius: ${radius};
    }
  `
}

export default scrollbar

export const transparentScrollbar = () => {
  return scrollbar({
    width: 0,
    trackColor: 'transparent',
    thunmbColor: 'transparent',
  })
}
