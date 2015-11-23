
const winston = require('winston');
const notify = require('slack-notify');

/**
 * @class SlackLogger
 * @extends winston.Transport
 */
class SlackLogger extends winston.Transport {
  
  constructor(props) {
    if (!props.token) {
      throw new Error('token is required');
    }
    super(props);
    this.name = 'slack';
    this.level = this.level || 'error';
    this.slack = notify('https://hooks.slack.com/services/' + props.token);
  }

  /**
   * @method log
   * @param level
   * @param msg
   * @param meta
   * @param callback
   */
  log(level, msg, meta, callback) {
    if (this.silent || !(level === 'slack' || level === this.level)) {
      return callback(null, true);
    }
    meta = meta || {};
    this.slack.send({
      channel: meta.channel || this.channel,
      icon_emoji: meta.iconEmoji || this.iconEmoji,
      icon_url: meta.iconUrl || this.iconUrl,
      username: meta.username || this.username,
      text: msg,
      fields: meta.fields
    });
    this.emit('logged');
    callback(null, true);
  }
}

module.exports = SlackLogger;