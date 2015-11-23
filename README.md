
# winston-transport-slack

[![Build Status](https://travis-ci.org/weflex/winston-transport-slack.svg)](https://travis-ci.org/weflex/winston-transport-slack)

The [winston](https://githubc.com/winstonjs/winston) transport for Slack notifications.

## Installation

```sh
$ npm install winston-transport-slack
```

## Usage

```js
var winston = require('winston');
var SlackTransport = require('winston-transport-slack');

winston.add('slack', new SlackTransport({
  level: 'error',
  token: 'required'
}));

// log
winston.log('error', 'something', metadata);
winston.log('slack', 'something', metadata);
```

## Test

```sh
$ npm test
```

## License

MIT
