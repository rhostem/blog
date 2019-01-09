import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { sizes } from 'styles'
import Navbar from './Navbar'
import Footer from './Footer'
import { ContentWrapper } from './content-wrapper'

const Page = styled.main`
  padding-top: ${sizes.topNavHeight};
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Navbar />
        <Page>
          <ContentWrapper>{children}</ContentWrapper>
          <Footer />
        </Page>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
