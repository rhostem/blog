// import React from 'react'
import styled from 'styled-components'

export const TabWrapper = styled.div`
  margin-bottom: 1rem;
  border-bottom: 3px solid var(--border);
`

export const Tab = styled.button`
  position: relative;
  min-width: 6rem;
  padding: 0.5rem 1rem;
  border: none;
  color: var(--text);
  background: transparent;
  &::after {
    content: ' ';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ isSelected }) =>
      isSelected ? 'var(--linkHover)' : 'transparent'};
  }
`
