
const { join } = require('path')
const { Nuxt, Builder } = require('nuxt')
const config = require('../../nuxt.config.js')

module.exports = (options) => {
  config.rootDir = join(__dirname, '../..')
  config.dev = true
  config.env.url = options.url
  config.axios.baseURL = options.url
  config.axios.browserBaseURL = options.url
  config.build.extend = () => { }

  const nuxt = new Nuxt(config)
  const builder = new Builder(nuxt)
  const port = options.port || process.env.PORT || 3000
  const host = options.host || process.env.HOST || 'localhost'

  builder.build()
    .then(() => {
      nuxt.listen(port, host)
    })
    .catch((err) => {
      console.error(err) // eslint-disable-line no-console
      process.exit(1)
    })
}
