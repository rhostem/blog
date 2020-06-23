import React, { useCallback } from 'react'
import {
  flatten,
  uniq,
  countBy,
  toLower,
  compose,
  sort,
  map,
  slice,
  length,
  path,
  isNil,
  filter,
} from 'ramda'
import { StaticQuery, graphql } from 'gatsby'
import Layout from 'components/layout/DefaultLayout'
import Link from 'gatsby-link'
import SEO from 'components/Seo'
import Head from 'components/Head'
import styled from 'styled-components'
import { media } from 'styles'
import PageTitle from 'components/PageTitle'
import { getTagRoute } from 'utils/routeResolver'

const TagGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  ${media.OVER_MOBILE} {
    grid-template-columns: 1fr 1fr 1fr;
  }
  grid-row-gap: 0.5rem;
  grid-column-gap: 1rem;
  font-size: 1rem;
  margin-left: -0.6rem;
  margin-right: -0.6rem;
  margin-bottom: 2rem;
`

const TagLink = styled(Link)`
  padding: 0.5rem 0.6rem;
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

const TagsPage = () => {
  const getTags = useCallback(allMarkdownRemark => {
    const allTags = compose(
      filter(t => !isNil(t)),
      flatten,
      map(edge => path(['node', 'frontmatter', 'tags'], edge))
    )(allMarkdownRemark.edges)

    const tagCountMap = countBy(t => toLower(t), allTags)
    const allUniqTags = uniq(allTags)

    const tags = compose(
      sort((tagA, tagB) => tagB.count - tagA.count),
      map(tag => ({
        name: tag,
        count: tagCountMap[toLower(tag)],
      }))
    )(allUniqTags)

    const TOP_TAGS_LIMIT = 6

    return {
      topRankTags: slice(0, TOP_TAGS_LIMIT, tags),
      restTags: slice(TOP_TAGS_LIMIT, length(tags), tags),
    }
  }, [])
  return (
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
          const { topRankTags, restTags } = getTags(data.allMarkdownRemark)
          return (
            <div>
              <PageTitle>태그</PageTitle>
              <TagGrid>
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
              </TagGrid>
            </div>
          )
        }}
      />
    </Layout>
  )
}

export default TagsPage
