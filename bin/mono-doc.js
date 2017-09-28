#!/usr/bin/env node

const program = require('commander')
const { Nuxt, Builder } = require('nuxt')
const config = require('../nuxt.config.js')
const { version } = require('../package')

program
  .version(version)
  .arguments('<url>')
  .option('-p, --port', 'Port to listen')
  .option('-H, --host', 'Host to listen')
  .option('--dev', 'Dev mode')
  .action(function (url, options) {
    config.dev = !!options.dev
    config.env.url = url
    config.axios.baseURL = url
    config.axios.browserBaseURL = url

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
  })

program.parse(process.argv)
