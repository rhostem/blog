import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { media, colors, sizes } from '../styles'
import { ContentWrapper } from '../components/content-wrapper'
// import NavbarSearch from '../components/NavbarSearch'
import NavMenus from './NavMenus'

const Wrap = styled.nav`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to right, #4568dc, #b06ab3);
  border-bottom: 1px solid ${colors.border};
`

export const NavbarCotent = styled(ContentWrapper)`
  display: flex;
  align-items: center;
`

const SiteTitle = styled.div`
  margin-right: auto;
  color: #fff;
  font-weight: 400;
  font-size: 1.2rem;
  font-family: 'Roboto', sans-serif;
  line-height: ${sizes.topNavHeight};
  letter-spacing: -1px;
`

const NavbarSearchWrap = styled.div`
  margin-left: auto;
  margin-right: 0.5rem;
  @media ${media.largerThanTablet} {
    margin-right: 1rem;
  }
`

const MenuWrap = styled.div`
  margin: 0;
  list-style: none;
  padding-left: 0;
`

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobileMenuVisible: false,
    }
  }

  handleClickMenuButton = e => {
    this.setState({ isMobileMenuVisible: !this.state.isMobileMenuVisible })
  }

  render() {
    return (
      <Wrap>
        <NavbarCotent>
          <Link to={'/'}>
            <SiteTitle>blog.rhostem.com</SiteTitle>
          </Link>
          {/* 검색 */}
          {/* <NavbarSearchWrap>
            <NavbarSearch />
          </NavbarSearchWrap> */}

          {/* 메뉴 */}
          <MenuWrap>
            <NavMenus
              isMobileMenuVisible={this.state.isMobileMenuVisible}
              onClickMenuBtn={this.handleClickMenuButton}
            />
          </MenuWrap>
        </NavbarCotent>
      </Wrap>
    )
  }
}

Navbar.propTypes = {}

export default Navbar
