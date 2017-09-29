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
  .command('start [url]', {
    aliases: '*',
    desc: 'Run mono-doc with api [url]',
    paramsDesc: ['API Url, default: http://localhost:8000'],
    run: require('./cmds/start')
  })
  .parseAndExit()
