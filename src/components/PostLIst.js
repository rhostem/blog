import Link from 'gatsby-link'
import React from 'react'
import { wordWrap } from 'polished'
import { media } from '../styles'
import styled from 'styled-components'
import { setHeightLimitAndEllipsis } from '../styles/mixin/setHeightLimit'
import format from 'date-fns/format'
import { getBodyHeight } from '../utils/getBodyHeight'
import { getPostRoute } from '../utils/routeResolver'
import * as R from 'ramda'
import throttle from 'utils/throttle'

export const PostListWrap = styled.div`
  width: 100%;
  margin: 2.8rem auto;
`

const PostLink = styled(Link)`
  display: block;
  border-radius: 2px;
  padding-bottom: 0.7rem;
  margin: 2.8rem 0;

  &:first-child {
    margin-top: 0;
  }
`

const PostTitle = styled.h2`
  ${wordWrap('default')};
  font-weight: 700;
  line-height: 1.4;
  margin: 0;
  font-size: 1.2rem;
  ${media.OVER_MOBILE} {
    font-size: 1.6rem;
  }
`
const PostSubTitle = styled.h3`
  font-size: 0.9rem;
  line-height: 1.4;
  font-weight: 400;
  margin: 0.5rem 0;
  color: var(--text);
  ${setHeightLimitAndEllipsis({
    line: 2,
  })};
`

const Info = styled.div`
  display: block;
  margin: 0.5rem 0;
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--text);
`

const MainImage = styled.div`
  width: 200px;
`

export const PostListItem = ({
  key,
  path,
  title,
  subTitle,
  date,
  timeToRead,
}) => {
  return (
    <PostLink key={key} to={path}>
      <PostTitle>{title}</PostTitle>
      {subTitle && <PostSubTitle>{subTitle}</PostSubTitle>}
      <Info>
        {format(new Date(date), 'YYYY.MM.DD')} &middot; {timeToRead} min to read
      </Info>
    </PostLink>
  )
}

type Props = {
  isInfiniteScroll: boolean,
  postEdges: Array<{
    node: {
      id: string,
      timeToRead: number,
      frontmatter: {
        path: string,
        title: string,
        subTitle: string,
        date: string,
      },
    },
  }>,
}

type State = {}

class PostList extends React.Component<Props, State> {
  static defaultProps = {
    isInfiniteScroll: false,
    postEdges: [],
  }

  pageSize = 10

  get postEdgesInView() {
    return R.slice(0, this.state.pageNum * this.pageSize, this.props.postEdges)
  }

  get lastPage() {
    return Math.ceil(this.props.postEdges.length / this.pageSize)
  }

  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
    }
  }

  componentDidMount() {
    if (this.props.isInfiniteScroll) {
      window.addEventListener('scroll', this.loadMorePost)
      this.loadMorePost()
    }
  }

  componentWillUnmount() {
    if (this.props.isInfiniteScroll) {
      window.removeEventListener('scroll', this.loadMorePost)
    }
  }

  loadMorePost = throttle(300, e => {
    const innerHeight = window.innerHeight
    const bodyHeight = getBodyHeight()
    const maximumScrollY = bodyHeight - innerHeight
    const scrollY = window.scrollY
    const isNextPageRequired =
      maximumScrollY - scrollY < 200 && this.state.pageNum < this.lastPage
    if (isNextPageRequired) {
      this.setState({ pageNum: R.inc(this.state.pageNum) })
    }
  })

  render() {
    return (
      <PostListWrap>
        {this.postEdgesInView.map(({ node }) => {
          const { frontmatter, timeToRead } = node
          return (
            <div key={node.id}>
              <PostListItem
                path={getPostRoute(
                  frontmatter.path || frontmatter.title.replace(/\s/g, '_')
                )}
                title={frontmatter.title}
                subTitle={frontmatter.subTitle}
                date={frontmatter.date}
                timeToRead={timeToRead}
              />
            </div>
          )
        })}
      </PostListWrap>
    )
  }
}

export default PostList
