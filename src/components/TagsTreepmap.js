import * as React from 'react'
import { Treemap } from 'recharts'
import styled from 'styled-components'
import { sizes } from '../styles'
import { getTagRoute } from '../../static/js/searchUtil'
import getByteSize from 'utils/getByteSize'

const MapRect = props => {
  const { x, y, width, height, name, handleClick, count, maxCount } = props

  let trimmedName = name
  const fontSize = 14
  const nameSize = getByteSize(name)
  const COLORS = ['#f7fcb9', '#edf8b1', '#c7e9b4']

  const colorIdx = Math.ceil((count / maxCount) * 3)

  if (name) {
    // 텍스트의 길이가 width보다 크면 자른다
    // 스트링 길이에 폰트사이즈를 곱하는 방식은 브라우저에 렌더링되는 정확한 텍스트의 길이는 아니다.
    if ((nameSize * fontSize * 1) / 2 > width - fontSize) {
      trimmedName = name.slice(0, parseInt(width / fontSize, 10) - 2) + '...'
    }
  }

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: COLORS[colorIdx - 1] || '#fff',
          // fill: '#7d69c7',
          stroke: '#fff',
          strokeWidth: '1px',
          pointerEvents: 'all',
        }}
        onClick={handleClick}
      />
      <text
        x={x + width / 2}
        y={y + height / 2 + 7}
        textAnchor="middle"
        fill={'hsla(291, 0%, 18%, 0.7)'}
        fontSize={fontSize}
        width={width}
        height={height}
        onClick={handleClick}>
        <tspan>{trimmedName}</tspan>
      </text>
    </g>
  )
}

const Wrapper = styled.div`
  margin: 2rem auto;
  rect:hover {
    cursor: pointer;
  }
`

type Props = {
  tags: Array<{
    name: string,
    count: number,
  }>,
  history: any,
  maxCount: number,
}
type State = {
  tags: Array<any>,
  mapSize: {
    width: number,
    height: number,
  },
}

class TagsTreeMap extends React.Component {
  props: Props
  state: State
  static defaultProps = {}
  setTreemapSize: Function

  constructor(props: Props) {
    super(props)
    this.state = {
      tags: [],
      mapSize: {
        width: 0,
        height: 0,
      },
    }
  }

  componentwillmount() {
    const history = this.props.history
    const tags = this.props.tags.map(tag => {
      return Object.assign({}, tag, {
        name: tag.name,
        handleClick: () => history.push(getTagRoute(tag)),
        maxCount: this.props.maxCount,
      })
    })
    this.setState({ tags })
  }

  componentDidMount() {
    this.setTreemapSize()
    window.addEventListener('resize', this.setTreemapSize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setTreemapSize)
  }

  setTreemapSize = () => {
    const browserWidth = document.documentElement.clientWidth
    const mapRatio = browserWidth < parseInt(sizes.phablet, 10) ? 4 / 3 : 3 / 4
    const wrapper: HTMLElement | null = document.getElementById(
      'tagsTreeMapWrapper'
    )
    const width = (wrapper && wrapper.clientWidth) || 0
    const height = (width && width * mapRatio) || 0

    this.setState({
      mapSize: {
        width,
        height,
      },
    })
  }

  render() {
    return (
      <Wrapper id="tagsTreeMapWrapper">
        <Treemap
          width={this.state.mapSize.width}
          height={this.state.mapSize.height}
          data={this.state.tags}
          dataKey="count"
          content={MapRect}
          isAnimationActive={false}>
          {/* <Tooltip content={<TagMapToolTip />} /> */}
        </Treemap>
      </Wrapper>
    )
  }
}

export default TagsTreeMap
