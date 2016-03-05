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
        });
      }
    },
    '/botadmin': {
      action: function(user, userID, channelID, message, rawEvent) {
        bot.addAdmin(rawEvent.d.mentions[0].id);
      }
    },
    '/deladmin': {
      action: function(user, userID, channelID, message, rawEvent) {
        bot.delAdmin(rawEvent.d.mentions[0].id);
      }
    }
  };
};
