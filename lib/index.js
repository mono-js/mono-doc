const express = require('express')
const { join } = require('path')
const { Nuxt, Builder, Generator } = require('nuxt')
const config = require('../nuxt.config')

module.exports = ({ conf, app, hook, log }) => {
  // Init routes
  const mono = {
    env: conf.env,
    version: conf.version,
    routes: []
  }
  // Init mono doc conf
  const monoDocConf = conf.mono.doc || {}
  monoDocConf.baseUrl = monoDocConf.baseUrl || '/'
  if (monoDocConf.static) monoDocConf.staticPath = monoDocConf.staticPath || 'docs'
  // Init nuxt config
  config.dev = false
  config.rootDir = join(__dirname, '..')
  config.modulesDir = join(__dirname, '../..')
  config.router.base = monoDocConf.baseUrl
  if (monoDocConf.static) {
    config.generate = {
      dir: join(conf.appDir, monoDocConf.staticPath),
      routes: [{
        route: '/',
        payload: {
          mono
        }
      }]
    }
  }
  // Create nuxt instance
  const nuxt = new Nuxt(config)

  if (!monoDocConf.static) {
    app.use(express.static(join(__dirname, '../static')))
    app.use('/_nuxt', express.static(join(__dirname, '../.nuxt/dist')))
    app.get(monoDocConf.baseUrl, (req, res) => {
      req.mono = mono

      nuxt.render(req, res)
    })
  }

  hook('ready', async ({ routes }) => {
    mono.routes = routes

    if (monoDocConf.static) {
      const builder = new Builder(nuxt)
      const generator = new Generator(nuxt, builder)

      try {
        log.debug('Generating...')
        await generator.generate({
          init: true,
          build: false
        })
        log.debug('Generate done')
      } catch (err) {
        log.error(err)
      }
    }
  })
}
