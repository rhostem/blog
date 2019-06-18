import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { colors, sizes } from '../styles'
import { ContentWrapper } from '../components/content-wrapper'
// import NavbarSearch from '../components/NavbarSearch'
import NavMenus from './NavMenus'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'
import NavbarAlgoliaSearch from 'components/NavbarAlgoliaSearch'
import { debounce } from 'throttle-debounce'

console.log(
  `process.env.ALGOLIA_APPLICATION_ID`,
  process.env.ALGOLIA_APPLICATION_ID
)

const searchClient = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_ADMIN_KEY
)

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
  justify-content: space-between;
`

const SiteTitle = styled.div`
  margin-right: auto;
  color: #fff;
  font-weight: 400;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  line-height: ${sizes.topNavHeight};
  letter-spacing: -1px;
`

const SearchBox = styled.div`
  margin-right: auto;
`

const MenuArea = styled.div`
  margin-left: 1rem;
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

  handleChangeSearchInput = e => {
    const { value } = e.target
    this.setState({ searchInput: value })
    this.updateCurrentRefinement(value)
  }

  updateCurrentRefinement = debounce(400, value => {
    console.log(`value`, value)
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

          <SearchBox>
            <InstantSearch indexName="posts" searchClient={searchClient}>
              <NavbarAlgoliaSearch defaultRefinement="" />
            </InstantSearch>
          </SearchBox>
          <MenuArea>
            {/* 메뉴 */}
            <NavMenus
              isMobileMenuVisible={this.state.isMobileMenuVisible}
              onClickMenuBtn={this.handleClickMenuButton}
            />
          </MenuArea>
        </NavbarCotent>
      </Wrap>
    )
  }
}

Navbar.propTypes = {}

export default Navbar
