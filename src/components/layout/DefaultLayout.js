import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { sizes } from 'styles'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { ContentWrapper } from '../content-wrapper'
import lightTheme from 'styles/theme/light'

const Page = styled.main`
  padding-top: ${sizes.topNavHeight};
`

const DefaultLayout = ({ children }) => (
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
        <ThemeProvider theme={lightTheme}>
          <Navbar />
          <Page>
            <ContentWrapper>{children}</ContentWrapper>
            <Footer />
          </Page>
        </ThemeProvider>
      </>
    )}
  />
)

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DefaultLayout
