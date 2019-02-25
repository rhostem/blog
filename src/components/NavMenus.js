import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { sizes, media } from '../styles'
import { clearFix } from 'polished'
import Transition from 'react-transition-group/Transition'

const Wrap = styled.div`
  ${clearFix()};
  margin: 0;
  padding-left: 0;
`

const DesktopMenus = styled.div`
  display: none;
  @media ${media.largerThanMobile} {
    display: block;
  }
`

const DesktopMenuItem = styled(Link)`
  float: left;
  line-height: ${sizes.topNavHeight};
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: 400;
  color: #fff;

  &:not(:first-child) {
    margin-left: 1.25rem;
  }

  & > i {
    margin-right: 0.3rem;
  }
`

const VisibleOnMobile = styled.div`
  display: block;

  @media ${media.largerThanMobile} {
    display: none;
  }
`

const MenuButton = styled.button`
  display: block;
  padding: 1rem 0.5rem;
  border: none;
  background: none;
  outline: none;
  font-weight: 100;
  color: #fff;

  &:hover {
    cursor: pointer;
  }
`

const MenuButtonIcon = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
`

const MobileMenuContent = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  right: -100%;
  width: 200px;
  height: 100vh;
  background-color: #21252f;
  color: #fff;
  border-left: 1px solid #222;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
`

const MobilMenuCloseBtnWrap = styled.div`
  display: flex;
`
const MobilMenuCloseBtn = styled.button`
  padding: 0.7rem 1rem;
  color: #fff;
  margin-left: auto;
  margin-right: 0.6rem;
  border: none;
  font-size: 1.2rem;
  &:hover {
    cursor: pointer;
  }
`

const MobileMenuList = styled.ul`
  display: flex;
  width: 100%;
  margin: 0;
  list-style: none;
  flex-direction: column;
`

const MobileMenuLink = styled(Link)`
  display: block;
  width: 100%;
  padding: 0.5rem 1.5rem;
  font-weight: 700;
  letter-spacing: -0.4px;
  color: #fff;

  & > i {
    margin-right: 0.5rem;
  }

  border-bottom: 1px solid #f1f1f1;
  border-top: 1px solid #f1f1f1;

  &:last-child {
    border-top: none;
  }
`

const mobileMenuContentTransition = {
  entered: { right: 0 },
  exited: { right: '-100%' },
}

const MobileMenuMask = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
`

const MobileMenuMaskTransition = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

type Props = {
  isMobileMenuVisible: boolean,
  onClickMenuBtn: Function,
}
type State = {}

const MENU_LIST = [
  {
    to: '/stats',
    text: '인기',
    icon: () => <i className="fas fa-fire-alt" />,
  },
  {
    to: '/tags',
    text: '태그',
    icon: () => <i className="fas fa-tags" />,
  },
  {
    to: '/archive',
    text: '연도별',
    icon: () => <i className="fas fa-archive" />,
  },
]

export default class NavMenus extends Component<Props, State> {
  render() {
    return (
      <Wrap>
        <DesktopMenus>
          {MENU_LIST.map(menu => (
            <DesktopMenuItem to={menu.to} key={menu.to}>
              {menu.icon()}
              {menu.text}
            </DesktopMenuItem>
          ))}
        </DesktopMenus>
        <VisibleOnMobile>
          <MenuButton onClick={this.props.onClickMenuBtn}>
            <MenuButtonIcon>
              <i className="fa fa-bars" aria-hidden="true" />
            </MenuButtonIcon>
          </MenuButton>

          <Transition in={this.props.isMobileMenuVisible} timeout={0}>
            {state => (
              <div>
                <MobileMenuContent
                  style={{ ...mobileMenuContentTransition[state] }}>
                  {/* 모바일 메뉴 닫기 버튼 */}
                  <MobilMenuCloseBtnWrap>
                    <MobilMenuCloseBtn onClick={this.props.onClickMenuBtn}>
                      <i className="fa fa-arrow-right" aria-hidden="true" />
                    </MobilMenuCloseBtn>
                  </MobilMenuCloseBtnWrap>
                  <MobileMenuList>
                    {MENU_LIST.map(menu => (
                      <MobileMenuLink
                        key={menu.to}
                        to={menu.to}
                        onClick={this.props.onClickMenuBtn}>
                        <span
                          style={{
                            display: 'inline-block',
                            minWidth: '1.4rem',
                            marginRight: '0.5rem',
                          }}>
                          {menu.icon()}
                        </span>
                        {menu.text}
                      </MobileMenuLink>
                    ))}
                  </MobileMenuList>
                </MobileMenuContent>
              </div>
            )}
          </Transition>

          <Transition
            in={this.props.isMobileMenuVisible}
            appear
            mountOnEnter
            unmountOnExit
            timeout={300}>
            {state => (
              <MobileMenuMask
                onClick={this.props.onClickMenuBtn}
                style={{ ...MobileMenuMaskTransition[state] }}
              />
            )}
          </Transition>
        </VisibleOnMobile>
      </Wrap>
    )
  }
}
