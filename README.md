<h1 align="center"><img src="https://user-images.githubusercontent.com/904724/30934972-81afdcea-a3cf-11e7-9bda-000c1b1832c0.png" width="350" alt="Mono Doc"/></h1>

> Documentation generator for [Mono](https://github.com/terrajs/mono) projects

## Installation

```bash
npm install -g mono-doc
```

## Usage

Start documentation server on http://localhost:3000 for `<api-url>`:

```bash
mono-doc <api-url>
```

Help:

```console
$ mono-doc --help
Usage: mono-doc <command> <args> [options]

Commands:
  start [url]  Run mono-doc with api [url]                                                 [default]

Options:
  -h, --help     Show help                                                [commands: help] [boolean]
  -v, --version  Show version number                                   [commands: version] [boolean]
  --port <port>  Port                                                                       [number]
  --host <host>  Host                                                                       [string]
```

## Routes

Mono Doc ses the definition of your Mono routes to generate the doc.

You can override it with the `documentation` key inside Mono routes:

```js
module.exports = [
  {
    method: 'GET',
    path: 'my-route',
    // displays query and body params
    validation: {
      query: ...,
      body: ...
    },
    handler: ...,
    // override default generated doc
    documentation: {
      name: 'This is my route',
      description: 'My route is doing a great job'
    }
  }
]
```

## Deployment

You can install it locally:

```bash
npm install --save mono-doc
```

Add a start script that launches `mono-doc` inside your `package.json`:

```json
{
  "name": "my-doc",
  "scripts": {
    "start": "mono-doc"
  },
  "dependencies": {
    "@terrajs/mono-doc": "^0.5.4"
  }
}
```

Deploy it and enjoy !

## Credits

Logo created by Frederick Allen from the Noun Project.
