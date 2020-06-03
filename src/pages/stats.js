import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Layout from 'components/layout/DefaultLayout'
import SEO from 'components/Seo'
import Head from 'components/Head'
import { getPostRoute } from 'utils/routeResolver'
import styled from 'styled-components'
import PageTitle from '../components/PageTitle'
import PostRankTable, { PostRankData } from '../components/PostRankTable'
import axios from 'axios'
import { TabWrapper, Tab } from '../components/PostRankTab'
import LoadingSpinner from '../components/LoadingSpinner'
import subDays from 'date-fns/sub_days'
import format from 'date-fns/format'

const SITE_CONFIG = require('../../site-config')

type PageView = {
  count: number,
  page: string,
}

type Props = {}

type State = {
  postList: PostRankData[],
  pageViews: PageView[],
}

const TableWrap = styled.div`
  min-height: 70vh;
`

const WEEK = 'week'
const MONTH = 'month'
const YEAR = 'year'
const ALL = 'ALL'

class StatsRoute extends React.Component<Props, State> {
  tabs = [MONTH, YEAR, ALL]
  tabNameMap = {
    [MONTH]: '지난 30일',
    [YEAR]: '지난 1년',
    [ALL]: '전체 기간',
  }

  routeTitleMap = {}
  defaultTab = this.tabs[0]

  constructor(props) {
    super(props)
    this.state = {
      currentTab: this.defaultTab,
      pageViews: [],
      postList: [],
      isLoadingData: true,
    }
  }

  componentDidMount() {
    this.handleChangeTab()
  }

  handleChangeTab = (tab = this.defaultTab) => {
    let startDate // 시작일은 탭에 따라 결정
    let endDate = subDays(new Date(), 1) // 어제까지 조회
    const DATE_FORMAT = 'YYYY-MM-DD'

    this.setState({
      currentTab: tab,
      isLoadingData: true,
    })

    switch (tab) {
      case WEEK:
        startDate = subDays(endDate, 7)
        break
      case MONTH:
        startDate = subDays(endDate, 30)
        break
      case YEAR:
        startDate = subDays(endDate, 365)
        break
      case ALL:
        startDate = new Date('2016-12-29') // 첫 포스트 업로드 날짜
        break

      default:
        break
    }

    axios
      .get(`https://blogapi.rhostem.com/api/ga/post_pageviews`, {
        params: {
          startDate: format(startDate, DATE_FORMAT),
          endDate: format(endDate, DATE_FORMAT),
        },
      })
      .then(res => {
        const pageViews: PageView[] = res.data

        this.setState({
          isLoadingData: false,
          pageViews,
          postList: pageViews
            .map((pageView: PageView) => {
              return {
                title: pageView.page,
                route: pageView.page,
                pageView: pageView.count,
              }
            })
            .filter(post => !!post.title)
            .filter(post => post.pageView > 10),
        })
      })
  }

  render() {
    return (
      <Layout>
        <SEO
          title="인기 포스트"
          description="Google analytics 데이터를 사용해 구성한 인기 페이지"
        />
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
                `${SITE_CONFIG.pathPrefix}${getPostRoute(
                  node.frontmatter.path
                )}`
              ] = node.frontmatter.title
            })

            return (
              <div>
                <PageTitle>인기 포스트</PageTitle>
                <TabWrapper>
                  {this.tabs.map((tab, i) => (
                    <Tab
                      key={tab}
                      onClick={() => this.handleChangeTab(tab)}
                      isSelected={tab === this.state.currentTab}>
                      {this.tabNameMap[tab]}
                    </Tab>
                  ))}
                </TabWrapper>

                <TableWrap>
                  {this.state.isLoadingData && <LoadingSpinner />}
                  <PostRankTable
                    titleMap={titleMap}
                    postList={this.state.postList}
                  />
                </TableWrap>
              </div>
            )
          }}
        />
      </Layout>
    )
  }
}

export default StatsRoute
