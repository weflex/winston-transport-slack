'use strict';

const util = require('util');
const winston = require('winston');
const slack = require('slack-notify');

function SlackLogger (props) {
  if (!(this instanceof SlackLogger)) {
    return new SlackLogger(props);
  }
  if (!props || !props.token) {
    throw new Error('props.token is required');
  }
  this.name = props.name || 'slack';
  this.level = props.level || 'error';
  this.slack = slack('https://hooks.slack.com/services/' + props.token);
  winston.Transport.call(props);
}
util.inherits(SlackLogger, winston.Transport);

SlackLogger.prototype.log = function log (level, msg, meta, callback) {
  let self = this;
  if (self.silent || !(level === 'slack' || level === self.level)) {
    return callback(null, true);
  }
  meta = meta || {};
  self.slack.send({
    channel: meta.channel || self.channel,
    icon_emoji: meta.iconEmoji || self.iconEmoji,
    icon_url: meta.iconUrl || self.iconUrl,
    username: meta.username || self.username,
    text: msg,
    fields: meta.fields
  }, function (err) {
    if (err) {
      if (typeof self.onerror === 'function') {
        self.onerror(err);
      }
      callback(err);
    } else {
      self.emit('logged');
      callback(null, true);
    }
  });
};

if (!winston.transports.Slack) {
  Object.defineProperty(winston.transports, 'Slack', {
    enumerable: true,
    get: function () {
      return SlackLogger;
    }
  });
}
module.exports = SlackLogger;