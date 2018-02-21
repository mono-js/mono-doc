const { nuxt } = require('mono-doc')

module.exports = [
  {
    method: 'GET',
    path: '/documentation',
    handler: nuxt.render
  }
]
