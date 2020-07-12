import React from 'react'
import Helmet from 'react-helmet'
import { GlobalStyle } from '../styles/globalStyle'

export default function Head({ children }) {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/fonts/nanum-square/font.css" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:100,400,700"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
          integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css"
          integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8="
          crossorigin="anonymous"
        />
        <script defer src="/js/rollbar.js" />
        {children}
      </Helmet>
      <GlobalStyle />
    </>
  )
}
