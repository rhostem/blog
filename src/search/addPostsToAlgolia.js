const R = require('ramda')
const algoliasearch = require('algoliasearch')
const striptags = require('striptags')
const axios = require('axios')
const { format, subYears } = require('date-fns')
const { getPostRoute } = require('../utils/routeResolver')
const decodeHTML = require('../utils/decodeHtml')

/**
 * upload post data to algolia for instant search
 */
async function addPostIndicesToAlgolia({
  postEdges = [
    {
      node: {
        id: '',
        html: '',
        timeToRead: '',
        frontmatter: {
          path: '',
          title: '',
          subTitle: '',
          date: '',
          tags: '',
        },
      },
    },
  ],
  allTags = [],
}) {
  const client = algoliasearch(
    process.env.GATSBY_ALGOLIA_APPLICATION_ID,
    process.env.GATSBY_ALGOLIA_ADMIN_KEY
  )

  const index = client.initIndex(process.env.GATSBY_ALGOLIA_INDEX_POSTS)

  const { data: pageViews } = await axios.get(
    `https://blogapi.rhostem.com/api/ga/post_pageviews`,
    {
      params: {
        startDate: format(subYears(new Date(), 1), 'YYYY-MM-DD'),
        endDate: format(new Date(), 'YYYY-MM-DD'),
      },
    }
  )

  // 검색에 필요한 데이터 정리
  const postObjects = postEdges.map(edge => {
    const { node } = edge
    const { id, html, timeToRead, frontmatter } = node
    const { path, title, subTitle, date, tags } = frontmatter

    const pageView = R.pipe(
      data => data.find(p => p.page === getPostRoute(path)),
      R.prop('count')
    )(pageViews)

    /**
     * 레코드의 크기 제한이 10kb라서 포스트 전체를 하나의 레코드에 담을 수 없다.
     * html을 </p> 태그로 분리한 후 5개 단락을 합쳐서 1개의 레코드에 저장하도록 한다.
     *
     * 참조) https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/how-to/indexing-long-documents/
     */
    const paragraphs = html.split(`</p>`)
    const bodies = []

    while (paragraphs.length > 0) {
      const chunks = paragraphs.splice(0, 5)
      bodies.push(
        chunks
          .filter(c => !!c)
          .map(chunk =>
            R.pipe(
              striptags,
              decodeHTML
            )(chunk)
          )
          .join(' ')
      )
    }

    return bodies.map((body, index) => {
      return {
        objectID: `${id}_${index}`,
        body,
        title,
        subTitle,
        date,
        tags,
        timeToRead,
        path,
        pageView,
      }
    })
  })

  const postObjectsFlatten = R.flatten(postObjects)

  index.addObjects(postObjectsFlatten, (err, content) => {
    if (err) {
      console.error(err)
    }
  })

  index.deleteObjects(
    allTags.map(t => `tag_${t.replace(/\s+/g, '_').toLowerCase()}`),
    err => {
      console.error(err)
    }
  )

  index.setSettings(
    {
      searchableAttributes: ['body', 'title', 'subTitle', 'tags'],
      attributeForDistinct: 'title',
      distinct: true,
      customRanking: ['desc(pageView)'],
      hitsPerPage: 5,
    },
    (err, content) => {
      if (err) {
        console.error(err)
      }
    }
  )
}

module.exports = addPostIndicesToAlgolia
