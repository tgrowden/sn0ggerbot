module.exports = function(bot, config, prompts) {
  bot.on('message', function(user, userID, channelID, message, rawEvent) {
    rawEvent.d.mentions.forEach(function(mention) {
      if (mention.id == bot.id) {
        var _tts = function() {
          if (config.ttsAlerts) {
            return true;
          } else {
            return false;
          }
        };
        bot.sendMessage({
          to: channelID,
          message: 'sup bb?',
          tts: _tts()
        });
      }
    });
  });
  bot.on("ready", function(rawEvent) {
    if (config.ttsAlerts) {
      bot.on('presence', function(user, userID, status, gameName, rawEvent) {
        if (rawEvent.d.guild_id == config.server) {
          bot.sendMessage({
            to: config.channel,
            message: user + " is now " + status,
            tts: true //Optional
          }, function(error, response) {
            bot.deleteMessage({
              channel: response.channel_id,
              messageID: response.id
            });
          });
        }
      });
    }
  });
};
