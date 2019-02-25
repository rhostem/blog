import * as React from 'react'
import { Treemap } from 'recharts'
import styled from 'styled-components'
import { sizes } from '../styles'
import { getTagRoute } from '../../static/js/searchUtil'

/**
 * UTF-8 형식 문자열의 바이트 크기 계산
 * UTF-8 문자는 1바이트부터 4바이트를 사용하며 범위별로 다른 비트 패턴을 사용한다.
 *
 * 유니코드 문자를 UTF-8 형식으로 표현할 때
 * 7비트로 표현 가능한 U+0000 ~ U+007F 에 해당하는 문자는 1바이트,
 * 11비트 표현 가능한 U+0080 ~ U+07FF 에 해당하는 문자는 2바이트,
 * 16비트 표현 가능한 U+0800 ~ U+FFFF 에 해당하는 문자는 3바이트,
 * 를 각각 사용한다.
 * (4바이트로 표현되는 문자는 거의 사용되지 않으므로 무시한다)
 *
 * 특정 문자의 유니코드 코드값을 charCodeAt으로 가져온 후
 * 비트 shift 연산을 이용해서 해당 문자의 비트 크기를 확인해서 UTF-8로 표현되는 바이트 크기를 계산한다.
 *
 * 참조)
 * https://ko.wikipedia.org/wiki/UTF-8
 * http://programmingsummaries.tistory.com/239
 * https://gist.github.com/mathiasbynens/1010324
 */
export function getByteSize(s: string = '') {
  const str = s.toString()
  let byteSize = 0
  let char = ''

  for (let i = 0; !isNaN(str.charCodeAt(i)); i++) {
    char = str.charCodeAt(i)

    // 12비트 이상으로 표현 가능한 유니코드
    if (char >> 11) {
      byteSize += 3

      // 8비트 ~ 11비트로 표현 가능한 유니코드
    } else if (char >> 7) {
      byteSize += 2

      // 7비트 이하로 표현 가능한 유니코드
    } else {
      byteSize += 1
    }
  }

  return byteSize
}

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

// const TagMapToolTip = (props: any) => {
//   const { active, payload } = props

//   const ToolTip = styled.div`
//     background-color: #fff;
//     border-radius: 3px;
//     padding: 1rem;
//     margin: 0.5rem;
//     font-size: 0.9rem;
//   `

//   return active ? (
//     <ToolTip>
//       {payload[0].payload.name} - {payload[0].value}개의 글
//     </ToolTip>
//   ) : null
// }

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
