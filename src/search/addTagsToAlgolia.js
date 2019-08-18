const algoliasearch = require('algoliasearch')

/**
 * upload post data to algolia for instant search
 */
function addTagsToAlgolia(allTags = ['name']) {
  const client = algoliasearch(
    process.env.GATSBY_ALGOLIA_APPLICATION_ID,
    process.env.GATSBY_ALGOLIA_ADMIN_KEY
  )

  const index = client.initIndex(process.env.GATSBY_ALGOLIA_INDEX_TAGS)

  const tagObjects = allTags.map((tag, index) => ({
    objectID: `tag_${tag.replace(/\s+/g, '_').toLowerCase()}`,
    tag,
  }))

  index.addObjects(tagObjects, (err, content) => {
    if (err) {
      console.error(err)
    }
  })

  index.setSettings(
    {
      searchableAttributes: ['tag'],
      attributeForDistinct: 'tag',
      distinct: true,
    },
    (err, content) => {
      if (err) {
        console.error(err)
      }
    }
  )
}

module.exports = addTagsToAlgolia
