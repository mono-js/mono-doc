const express = require('express')
const { join } = require('path')
const { Nuxt } = require('nuxt')
const config = require('../nuxt.config')

module.exports = ({ conf, app, hook }) => {
  let reqRoutes = []
  config.dev = false
  config.rootDir = join(__dirname, '..')
  config.modulesDir = join(__dirname, '../..')
  // config.router.base = '/_doc'
  // config.build.publicPath = '/_doc/_nuxt/'
  const nuxt = new Nuxt(config)

  app.use(express.static(join(__dirname, '../static')))
  app.use('/_nuxt', express.static(join(__dirname, '../.nuxt/dist')))
  app.get('/', (req, res) => {
    req.mono = {
      env: conf.env,
      version: conf.version,
      routes: reqRoutes
    }

    nuxt.render(req, res)
  })


  hook('ready', ({ routes }) => {
    reqRoutes = routes
  })
}
