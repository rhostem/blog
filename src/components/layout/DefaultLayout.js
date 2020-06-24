import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { sizes } from 'styles'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { ContentWrapper } from '../content-wrapper'
import { useDarkMode, DarkModeContext } from 'components/hooks/useDarkMode'

const Page = styled.main`
  padding-top: ${sizes.topNavHeight};
  background: var(--bg);
  transition: background 0.3s linear;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const PageContents = styled(ContentWrapper)`
  padding-bottom: 2rem;
`

const DefaultLayout = ({ children }) => {
  const { theme, mode, toggleTheme } = useDarkMode()

  return (
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
          <ThemeProvider theme={theme}>
            <DarkModeContext.Provider
              value={{
                mode,
                toggleTheme,
              }}>
              <Navbar toggleTheme={toggleTheme} />
              <Page>
                <PageContents>{children}</PageContents>
                <Footer />
              </Page>
            </DarkModeContext.Provider>
          </ThemeProvider>
        </>
      )}
    />
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DefaultLayout
