const { join } = require('path')
const { Nuxt } = require('nuxt-start')
const config = require('../../nuxt.config.js')

module.exports = (options) => {
  config.rootDir = join(__dirname, '../../dist')
  config.env.url = options.url
  config.axios.baseURL = options.url
  config.axios.browserBaseURL = options.url

  // Create a new nuxt instance
  const nuxt = new Nuxt(config)
  const port = options.port || process.env.PORT || 3000
  const host = options.host || process.env.HOST || 'localhost'

  // Start nuxt.js server
  return nuxt.listen(port, host)
}
