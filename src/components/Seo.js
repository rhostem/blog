import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { concat, not, isEmpty, filter, includes, isNil, compose } from 'ramda'

export const DEFAULT_KEYWORDS = ['웹 개발', 'Front-end', '프론트엔드']

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
            property: `og:url`,
            content: 'https://blog.rhostem.com',
          },

          {
            property: `og:type`,
            content: 'website',
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
            property: `og:image`,
            content: '/icons/rhostem-profile.jpeg',
          },

          {
            name: `twitter:card`,
            content: `summary_large_image`,
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
          {
            name: `twitter:image`,
            content: '/icons/rhostem-profile.jpeg',
          },
        ]

        // 키워드 추가
        if (!isEmpty(keywords)) {
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

        console.log(`meta`, meta)

        // SEO 컴포넌트에 직접 전달받은 메타 태그는 중복을 제거하고 추가한다.
        if (meta.length > 0) {
          const metaNamesToAdd = meta
            .map(m => m.name)
            .filter(
              compose(
                not,
                isNil
              )
            )

          metaTags = concat(
            // metaTags에서 SEO 컴포넌트에 직접 전달된
            filter(currentMeta =>
              not(includes(currentMeta.name, metaNamesToAdd))
            )(metaTags),
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
  lang: `ko`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
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
