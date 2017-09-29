const { join } = require('path')
const { Nuxt } = require('nuxt-start')
const config = require('../../nuxt.config.js')

module.exports = (options) => {
  console.log(options)
  config.rootDir = join(__dirname, '../..')
  config.dev = false
  if (options.url) {
    process.env.MONO_URL = options.url
  }

  // Create a new nuxt instance
  const nuxt = new Nuxt(config)
  const port = options.port || process.env.PORT || 3000
  const host = options.host || process.env.HOST || 'localhost'

  // Start nuxt.js server
  nuxt.listen(port, host)
}
