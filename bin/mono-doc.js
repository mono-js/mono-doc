#!/usr/bin/env node
'use strict'

const updateNotifier = require('update-notifier')
const pkg = require('../package.json')

updateNotifier({ pkg }).notify()

require('sywac')
  .help('-h, --help')
  .version('-v, --version')
  .number('--port <port>', { desc: 'Port' })
  .string('--host <host>', { desc: 'Host' })
  .command('dev [url]', {
    desc: 'Run mono-doc with api [url] and watch for changes',
    paramsDesc: ['API Url, default: http://localhost:8000'],
    run: (argv) => {
      argv.url = argv.url || 'http://localhost:8000'
      require('./cmds/dev')(argv)
    }
  })
  .command('start [url]', {
    aliases: '*',
    desc: 'Run mono-doc with api [url]',
    paramsDesc: ['API Url, default: http://localhost:8000'],
    run: (argv) => {
      argv.url = argv.url || 'http://localhost:8000'
      require('./cmds/start')(argv)
    }
  })
  .parseAndExit()
