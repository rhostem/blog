import React from 'react'
import * as R from 'ramda'
import { StaticQuery, graphql } from 'gatsby'
import Layout from 'components/layout/DefaultLayout'
import Link from 'gatsby-link'
import SEO from 'components/Seo'
import Head from 'components/Head'
import { getPostRoute } from 'utils/routeResolver'
import styled from 'styled-components'
import { mixin } from 'styles'
import format from 'date-fns/format'
import PageTitle from '../components/PageTitle'

const YearArchive = styled.ul`
  margin: 2.8rem 0;
  list-style-type: disc;
  padding-left: 0;
`

const YearTitle = styled.h2`
  position: relative;
  padding-left: 1rem;
  margin-top: 1.4rem;
  margin-bottom: 1.4rem;
  font-weight: 400;

  &::before {
    ${mixin.centeredY()};
    content: ' ';
    left: 0;
    width: 4px;
    height: 0.9em;
    background-color: var(--linkHover);
  }
`

const PostTitleLink = styled(Link)`
  position: relative;
  list-style: disc;
  display: block;
  margin: 0.7rem 0 0.7rem 0;
  padding-left: 0.8rem;

  &::before {
    position: absolute;
    content: ' ';
    top: 0.65rem;
    left: 0;
    width: 0.2rem;
    height: 0.2rem;
    background-color: var(--linkHover);
    opacity: 0.6;
    border-radius: 1px;
  }

  &:hover {
    color: var(--linkHover);
  }
`

/**
 * frontmatter의 date를 사용해서 연도별로 묶는다
 * @param {*} postList
 */
const getPostByYear = (
  postList: Array<{ id: string, frontmatter: { date: string, title: string } }>
) => {
  const getYearFromDate = date => format(new Date(date), 'YYYY')
  const sortDesc = (a, b) => parseInt(b, 10) - parseInt(a, 10)
  const yearlyPosts = (year: string, allPosts) => {
    return allPosts.filter(
      post => year === getYearFromDate(post.frontmatter.date)
    )
  }

  const allYears = R.pipe(
    R.map(p => p.frontmatter.date),
    R.map(getYearFromDate),
    R.uniq
  )(postList).sort(sortDesc)

  const postByYear = allYears.map(year => ({
    year,
    posts: yearlyPosts(year, postList).sort((pA: PostNode, pB: PostNode) => {
      const dateA = +new Date(pA.frontmatter.date)
      const dateB = +new Date(pB.frontmatter.date)
      return dateB - dateA
    }),
  }))

  return postByYear
}

const IndexPage = () => (
  <Layout>
    <SEO title="" keywords={[]} />
    <Head />
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
          ) {
            edges {
              node {
                id
                frontmatter {
                  path
                  title
                  date
                }
              }
            }
          }
        }
      `}
      render={data => {
        const postList = data.allMarkdownRemark.edges.map(edge => edge.node)
        const postByYear = getPostByYear(postList)

        return (
          <div>
            <PageTitle>연도별 포스트</PageTitle>
            {postByYear.map(item => (
              <YearArchive key={item.year}>
                <YearTitle>{item.year}</YearTitle>
                {item.posts.map(post => (
                  <PostTitleLink
                    key={post.id}
                    to={getPostRoute(
                      post.frontmatter.path ||
                        post.frontmatter.title.replace(/\s/g, '_')
                    )}>
                    {post.frontmatter.title}
                  </PostTitleLink>
                ))}
              </YearArchive>
            ))}
          </div>
        )
      }}
    />
  </Layout>
)

export default IndexPage
