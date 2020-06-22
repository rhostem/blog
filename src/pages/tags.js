import React from 'react'
import * as R from 'ramda'
import { StaticQuery, graphql } from 'gatsby'
import Layout from 'components/layout/DefaultLayout'
import Link from 'gatsby-link'
import SEO from 'components/Seo'
import Head from 'components/Head'
import styled from 'styled-components'
import { colors, media } from 'styles'
import PageTitle from 'components/PageTitle'
import { getTagRoute } from 'utils/routeResolver'

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  ${media.OVER_MOBILE} {
    grid-template-columns: 1fr 1fr 1fr;
  }
  grid-row-gap: 0.5rem;
  grid-column-gap: 1rem;
  font-size: 1rem;
`

const TagLink = styled(Link)`
  padding: 0.5em 0.6em;
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 0.3s ease-in-out;
  margin-bottom: 0.2em;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  & > span {
    padding-bottom: 0.1em;
  }
`

const HotTagLink = styled(TagLink)`
  font-size: 1.2rem;
  font-weight: bold;
  & > span {
    display: inline-block;
    border-bottom: 2px solid ${({ theme }) => theme.colors.green};
  }
`

const TagsPage = () => (
  <Layout>
    <SEO title="" keywords={[]} />
    <Head />
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(limit: 2000) {
            edges {
              node {
                frontmatter {
                  tags
                }
              }
            }
          }
        }
      `}
      render={data => {
        const { allMarkdownRemark } = data
        const allTags = R.flatten(
          allMarkdownRemark.edges.map(edge => edge.node.frontmatter.tags)
        )
        const allUniqTags = R.uniq(allTags)
        const tagCountMap = R.countBy(t => R.toLower(t), allTags)

        const tags = R.compose(
          R.sort((tagA, tagB) => tagB.count - tagA.count),
          R.map(tag => ({
            name: tag,
            count: tagCountMap[R.toLower(tag)],
          }))
        )(allUniqTags)

        const topTagCount = 6
        const topRankTags = R.slice(0, topTagCount, tags)
        const restTags = R.slice(topTagCount, R.length(tags), tags)

        return (
          <div>
            <PageTitle>태그</PageTitle>
            <Wrap>
              {topRankTags.map((tag, index) => {
                return (
                  <HotTagLink to={getTagRoute(tag.name)}>
                    <span>{tag.name}</span>
                  </HotTagLink>
                )
              })}
              {restTags.map((tag, index) => {
                return (
                  <TagLink to={getTagRoute(tag.name)}>
                    <span>{tag.name}</span>
                  </TagLink>
                )
              })}
            </Wrap>
          </div>
        )
      }}
    />
  </Layout>
)

export default TagsPage
