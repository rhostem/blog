// import React from 'react'
import styled from 'styled-components'
import media from '../styles/media'

export const TabWrapper = styled.div`
  margin-bottom: 1rem;
`

export const Tab = styled.button`
  min-width: 6rem;
  padding: 0.5rem 1rem;
  border: none;
  border-bottom: 3px solid
    ${({ isSelected }) => (isSelected ? '#76b835' : 'transparent')};
  outline: none;
`
