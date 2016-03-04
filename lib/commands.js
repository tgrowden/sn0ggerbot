// bot commands
module.exports = function(bot, config) {
  bot.commands = {
    '/booty': {
      action: function(user, userID, channelID, message, rawEvent) {
        bot.playTrack('booty.mp3');
        bot.getMessages({
          channel: config.channel,
          limit: 1
        }, function(error, messageArr) {
          if (error) return console.log(error);
          bot.deleteMessage({
            channel: config.channel,
            messageID: messageArr[0].id
          });
        });
      }
    },
    '/jc': {
      action: function(user, userID, channelID, message, rawEvent) {
        bot.playTrack('cena.mp3');
        bot.getMessages({
          channel: config.channel,
          limit: 1
        }, function(error, messageArr) {
          if (error) return console.log(error);
          bot.deleteMessage({
            channel: config.channel,
            messageID: messageArr[0].id
          });
        });
      }
    },
  };
};
