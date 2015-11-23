
const test = require('tape');
const sinon = require('sinon');
const slack = require('slack-notify');
const winston = require('winston');
const SlackTransport = require('./');

test('add transport', function (t) {
  winston.add(SlackTransport, {
    level: 'error',
    token: 'token',
  });
  t.ok(winston.transports.Slack);
  t.equal(winston.transports.Slack, SlackTransport);
  t.end();
});

test('use transports via info', function (t) {
  winston.log('info', 'abc', {});
  t.end();
});
