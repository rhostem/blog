import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { sizes } from 'styles'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { ContentWrapper } from '../content-wrapper'
import { useDarkMode } from 'components/hooks/useDarkMode'

const Page = styled.main`
  padding-top: ${sizes.topNavHeight};
`

const DefaultLayout = ({ children }) => {
  const { mode, theme, toggleTheme } = useDarkMode()
  console.log(`mode`, mode)

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
            <Navbar />

            <div
              css={`
                margin-top: 100px;
              `}>
              <button onClick={toggleTheme}>toggle theme</button>
            </div>

            <Page>
              <ContentWrapper>{children}</ContentWrapper>
              <Footer />
            </Page>
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
