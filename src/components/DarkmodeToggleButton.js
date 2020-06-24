import React from 'react'
import { DarkModeContext, themeModes } from 'components/hooks/useDarkMode'
import styled from 'styled-components'
import { useContext } from 'react'
import { centeredY } from 'styles/mixin/centered'

const ToggleButton = styled.button`
  display: block;
  width: 50px;
  padding: 0;
  border: none;
  outline: none;
  background: none;
`

const ToggleTrack = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  background: #0f1114;
  height: 24px;
  padding: 3px 7px;
  border-radius: 12px;

  .moon {
    width: 13px;
    height: 13px;
    background: transparent url('/images/moon.svg') no-repeat center;
    background-size: contain;
  }

  .sun {
    width: 15px;
    height: 15px;
    background: transparent url('/images/daylight.svg') no-repeat center;
    background-size: contain;
    margin-left: auto;
  }
`

const ToggleThumb = styled.div`
  ${centeredY()};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  background: #fff;
  left: ${({ mode }) =>
    mode === themeModes.DARK ? 'calc(100% - 24px);' : '0'};
  transition: left 0.2s linear;
`

export default function DarkmodeToggleButton() {
  const { mode, toggleTheme } = useContext(DarkModeContext)

  return (
    <ToggleButton onClick={toggleTheme}>
      <ToggleTrack>
        <div className="moon" />
        <div className="sun" />
        <ToggleThumb mode={mode} style={{}} />
      </ToggleTrack>
    </ToggleButton>
  )
}
