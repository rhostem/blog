import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

const DEFAULT_KEYWORDS = ['웹 개발', 'Front-end', '프론트엔드']

function SEO({ title, description, keywords = [], meta = [], lang }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description
        const siteTitle = data.site.siteMetadata.title

        let metaTags = [
          {
            name: `description`,
            content: metaDescription,
          },
          {
            property: `og:title`,
            content: title,
          },
          {
            property: `og:description`,
            content: metaDescription,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: data.site.siteMetadata.author,
          },
          {
            name: `twitter:title`,
            content: title,
          },
          {
            name: `twitter:description`,
            content: metaDescription,
          },
        ]

        // 키워드 추가
        if (keywords.length) {
          metaTags.push({
            name: `keywords`,
            content: keywords.concat(DEFAULT_KEYWORDS).join(`, `),
          })
        } else {
          metaTags.push({
            name: 'keywords',
            content: DEFAULT_KEYWORDS.join(', '),
          })
        }

        // 전달받은 메타 태그가 있을 때 기본 메타태그의 중복을 제거하고 추가한다
        if (meta.length) {
          const metaNames = meta.map(m => m.name)
          metaTags = R.concat(
            // defaultMeta에서 중복 제거
            R.filter(m => R.not(R.includes(m.name, metaNames)))(metaTags),
            meta
          )
        }

        return (
          <Helmet
            htmlAttributes={{
              lang: 'ko',
            }}
            title={title || siteTitle}
            titleTemplate={title ? `%s | ${siteTitle}` : ''}
            meta={metaTags}
          />
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
