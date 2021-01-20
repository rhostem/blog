import React, { useState, useCallback, useMemo } from 'react'
import swr from 'swr'
import { StaticQuery, graphql } from 'gatsby'
import Layout from 'components/layout/DefaultLayout'
import SEO from 'components/Seo'
import { getPostRoute } from 'utils/routeResolver'
import styled from 'styled-components'
import PageTitle from '../components/PageTitle'
import PostRankTable from '../components/PostRankTable'
import axios from 'axios'
import { TabWrapper, Tab } from '../components/PostRankTab'
import LoadingSpinner from '../components/LoadingSpinner'
import subDays from 'date-fns/sub_days'
import format from 'date-fns/format'
import makeFormUrlEncoded from 'utils/makeFormUrlEncoded'
import Head from 'components/Head'

type IPageView = {
  count: number,
  page: string,
}

const TableWrap = styled.div`
  min-height: 70vh;
`

const WEEK = 'week'
const MONTH = 'month'
const YEAR = 'year'
const ALL = 'ALL'
const DATE_FORMAT = 'YYYY-MM-DD'

export default function Stats() {
  const tabs = [MONTH, YEAR, ALL]
  const tabNameMap = {
    [MONTH]: '지난 30일',
    [YEAR]: '지난 1년',
    [ALL]: '전체 기간',
  }

  const [currentTab, setCurrentTab] = useState(tabs[0])
  const [isLoading, setIsLoading] = useState(false)

  const handleChangeTab = useCallback(tab => {
    setCurrentTab(tab)
  }, [])

  const startDate = useMemo(
    () => {
      let endDate = subDays(new Date(), 1) // 어제까지 조회
      switch (currentTab) {
        case WEEK:
          return subDays(endDate, 7)
        case MONTH:
          return subDays(endDate, 30)
        case YEAR:
          return subDays(endDate, 365)
        case ALL:
          return new Date('2016-12-29') // 첫 포스트 업로드 날짜

        default:
          break
      }
    },
    [currentTab]
  )

  const slowThresold = 300
  const { data: pageViews, error } = swr(
    `https://blogapi.rhostem.com/api/ga/post_pageviews?${makeFormUrlEncoded({
      startDate: format(startDate, DATE_FORMAT),
      endDate: format(new Date(), DATE_FORMAT),
    })}`,
    query => {
      let wait = setTimeout(() => {
        setIsLoading(true)
      }, slowThresold)

      return axios
        .get(query)
        .then(res => res.data)
        .finally(() => {
          clearTimeout(wait)
          setIsLoading(false)
        })
    }
  )

  const postList = useMemo(
    () => {
      return Array.isArray(pageViews)
        ? pageViews
            .map((pageView: IPageView) => {
              return {
                title: pageView.page,
                route: pageView.page,
                pageView: pageView.count,
              }
            })
            .filter(post => !!post.title)
            .filter(post => post.pageView > 10)
        : []
    },
    [pageViews]
  )

  return (
    <Layout>
      <Head />
      <SEO
        title="인기 포스트"
        description="Google analytics 데이터를 사용해 구성한 인기 페이지"
      />

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
                  }
                }
              }
            }
          }
        `}
        render={data => {
          const titleMap = {}
          data.allMarkdownRemark.edges.forEach(({ node }) => {
            titleMap[
              getPostRoute(
                node.frontmatter.path ||
                  node.frontmatter.title.replace(/\s/g, '_')
              )
            ] = node.frontmatter.title
          })

          return (
            <div>
              <PageTitle>인기 포스트</PageTitle>
              <TabWrapper>
                {tabs.map((tab, i) => (
                  <Tab
                    key={tab}
                    onClick={() => handleChangeTab(tab)}
                    isSelected={tab === currentTab}>
                    {tabNameMap[tab]}
                  </Tab>
                ))}
              </TabWrapper>

              <TableWrap>
                {isLoading && <LoadingSpinner />}
                {!error && !isLoading && (
                  <PostRankTable titleMap={titleMap} postList={postList} />
                )}
              </TableWrap>
            </div>
          )
        }}
      />
    </Layout>
  )
}
