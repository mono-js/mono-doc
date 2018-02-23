<h1 align="center"><img src="https://user-images.githubusercontent.com/904724/31045465-fb13c3f0-a5e4-11e7-8893-6044908700bb.png" width="350" alt="Mono Doc"/></h1>

> API Documentation module for [Mono](https://github.com/terrajs/mono)

[![npm version](https://img.shields.io/npm/v/mono-doc.svg)](https://www.npmjs.com/package/mono-doc)
[![Travis](https://img.shields.io/travis/terrajs/mono-doc/master.svg)](https://travis-ci.org/terrajs/mono-doc)
[![Coverage](https://img.shields.io/codecov/c/github/terrajs/mono-doc/master.svg)](https://codecov.io/gh/terrajs/mono-doc.js)
[![license](https://img.shields.io/github/license/terrajs/mono-doc.svg)](https://github.com/terrajs/mono-doc/blob/master/LICENSE)

Mono Doc generates your Mono REST API documentation on the '/' route.

## Installation

```bash
npm install --save mono-doc
```

Then, in your configuration file of your Mono application (example: `conf/application.js`):

```js
module.exports = {
  mono: {
    modules: ['mono-doc']
  }
}
```

## Configuration

Mono Doc will use the `doc` property of your configuration (example: `conf/development.js`):

```js
module.exports = {
  mono: {
    doc: {
    }
  }
}
```

## Routes

Mono Doc sees the definition of your Mono routes to generate the doc.

You can override it with the `documentation` or `doc` key inside Mono routes:

```js
module.exports = [
  {
    method: 'GET',
    path: '/hello',
    // displays query and body params
    validation: {
      query: ...,
      body: ...
    },
    handler: ...,
    // override default generated doc
    doc: {
      name: 'This is my route',
      description: 'My route is doing a great job'
    }
  }
]
```

## Credits

mono-doc uses [Nuxt.js](https://nuxtjs.org/) to generate the documentation.

Logo created by Frederick Allen from the Noun Project.
