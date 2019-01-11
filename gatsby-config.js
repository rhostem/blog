const path = require('path')
const SITE_CONFIG = require('./site-config')

/**
 * environment variable setting
 * https://www.gatsbyjs.org/docs/environment-variables/#server-side-nodejs
 */
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const SITE_URL = `${SITE_CONFIG.siteUrl}${SITE_CONFIG.pathPrefix}`

module.exports = {
  pathPrefix: SITE_CONFIG.pathPrefix,
  siteMetadata: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    author: SITE_CONFIG.author,
    githubUrl: 'https://github.com/rhostem/blog',
    url: `${SITE_URL}`,
    emailUrl: 'syoung.j@gmail.com',
    siteUrl: `${SITE_URL}`, // sitemap plugin
    googleAnalyticsID: SITE_CONFIG.googleAnalyticsID,
    rssMetadata: {
      site_url: `${SITE_URL}`,
      feed_url: `${SITE_URL}${SITE_CONFIG.siteRss}`,
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      image_url: `${SITE_URL}icons/icon-512x512.png`,
      author: SITE_CONFIG.author,
      copyright: SITE_CONFIG.copyright,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        // Learn about environment variables: https://gatsby.app/env-vars
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      // https://www.gatsbyjs.org/packages/gatsby-transformer-remark/?=remark
      resolve: `gatsby-transformer-remark`,
      options: {
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              showCaptions: false,
              wrapperStyle: 'background: white;',
            },
          },
          {
            // https://www.gatsbyjs.org/packages/gatsby-remark-images-contentful/
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 960,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-smartypants`,
            options: {
              dashes: `oldschool`,
            },
          },
          {
            // https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/?=gatsby-remark-prismjs
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          `gatsby-remark-autolink-headers`,
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow',
            },
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: SITE_CONFIG.title,
        short_name: SITE_CONFIG.title,
        description: SITE_CONFIG.description,
        start_url: SITE_CONFIG.pathPrefix,
        background_color: '#f7f7f7',
        theme_color: '#4568dc',
        display: 'browser',
        icon: `src/images/rhostem-profile.png`, // This path is relative to the root of the site.`,
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: SITE_CONFIG.googleAnalyticsID,
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `#76b835`,
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata
          ret.allMarkdownRemark = ref.query.allMarkdownRemark
          ret.generator = 'blog.rhostem.com'
          return ret
        },
        query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                author
                copyright
              }
            }
          }
        }
      `,
        feeds: [
          {
            serialize(ctx) {
              const rssMetadata = ctx.query.site.siteMetadata.rssMetadata
              return ctx.query.allMarkdownRemark.edges.map(edge => ({
                title: edge.node.frontmatter.title,
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                author: rssMetadata.author,
                url: `${rssMetadata.site_url}/posts/${
                  edge.node.frontmatter.path
                }`,
                guid: `${rssMetadata.site_url}/posts/${
                  edge.node.frontmatter.path
                }`,
                custom_elements: [{ 'content:encoded': edge.node.html }],
              }))
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt(truncate: true, pruneLength:150)
                      html
                      timeToRead
                      frontmatter {
                        path
                        date
                        title
                      }
                    }
                  }
                }
              }
            `,
            output: SITE_CONFIG.siteRss,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/styles/typography`,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        components: path.join(__dirname, 'src/components'),
        styles: path.join(__dirname, 'src/styles'),
        utils: path.join(__dirname, 'src/utils'),
      },
    },
    'gatsby-plugin-styled-components',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
    'gatsby-plugin-remove-serviceworker',
  ],
}
