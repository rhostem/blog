import { css } from 'styled-components'

export const centered = () => css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const centeredFixed = () => css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const centeredX = () => css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

export const centeredY = () => css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

export const centeredXFloat = () => css`
  position: relative;
  right: 50%;
  float: right;
  transform: translateX(50%);
`
