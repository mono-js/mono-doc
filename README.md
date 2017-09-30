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
