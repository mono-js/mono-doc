const { Nuxt } = require('nuxt')

module.exports = ({ conf, app }) => {
  const config = require('../nuxt.config')
  config.dev = conf.env !== 'production'

  const nuxt = new Nuxt(config)

  module.exports = nuxt
}
