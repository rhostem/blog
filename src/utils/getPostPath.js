const SITE_CONFIG = require('../../site-config')
export const getPostPath = path => `${SITE_CONFIG.pathPrefix}/posts/${path}`
