// import React from 'react'
import styled from 'styled-components'
import { colors } from '../styles'

export const TabWrapper = styled.div`
  margin-bottom: 1rem;
`

export const Tab = styled.button`
  min-width: 6rem;
  padding: 0.5rem 1rem;
  border: none;
  border-bottom: 3px solid
    ${({ isSelected }) => (isSelected ? colors.green : 'transparent')};
  outline: none;
  background: #fff;
`
