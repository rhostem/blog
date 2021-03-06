import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { sizes, media } from '../styles'
import { ContentWrapper } from '../components/content-wrapper'
import NavMenus from './NavMenus'
import CustomInstantSearch from './search/CustomInstantSearch'
import debounce from 'utils/debounce'
import DarkmodeToggleButton from 'components/DarkmodeToggleButton'
import { centeredY } from 'styles/mixin/centered'

const Wrap = styled.nav`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--navbarBg);
  border-bottom: 1px solid var(--border);
  transition: all 0.3s linear;
`

export const NavbarCotent = styled(ContentWrapper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SiteTitle = styled.div`
  margin-right: auto;
  color: var(--navbarColor);
  font-weight: 400;
  font-size: 0.9rem;
  font-family: 'Roboto', sans-serif;
  line-height: ${sizes.topNavHeight};
  letter-spacing: 0;
`

const MenuArea = styled.div`
  margin-left: 1rem;
  list-style: none;
  padding-left: 0;
`

const DarkModeToggleWrap = styled.div`
  ${centeredY()};
  left: calc(100% + 1rem);
  display: none;

  ${media.OVER_MOBILE} {
    display: block;
  }
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

  handleChangeSearchInput = e => {
    const { value } = e.target
    this.setState({ searchInput: value })
    this.updateCurrentRefinement(value)
  }

  updateCurrentRefinement = debounce(400, value => {
    this.setState({ currentRefinement: value })
  })

  componentDidMount() {}

  render() {
    return (
      <Wrap>
        <NavbarCotent>
          <Link to={'/'}>
            <SiteTitle>blog.rhostem.com</SiteTitle>
          </Link>

          <CustomInstantSearch defaultRefinement={null} />

          <MenuArea>
            {/* 메뉴 */}
            <NavMenus
              isMobileMenuVisible={this.state.isMobileMenuVisible}
              onClickMenuBtn={this.handleClickMenuButton}
            />
          </MenuArea>

          <DarkModeToggleWrap>
            <DarkmodeToggleButton />
          </DarkModeToggleWrap>
        </NavbarCotent>
      </Wrap>
    )
  }
}

Navbar.propTypes = {}

export default Navbar
