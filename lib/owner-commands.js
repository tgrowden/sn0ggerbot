var _ = require('lodash');
var fs = require('fs');
module.exports = function(bot, config) {
  bot.ownerCommands = {
    '/botadmin': {
      action: function(user, userID, channelID, message, rawEvent) {
        bot.addAdmin(rawEvent.d.mentions[0].id);
      }
    },
    '/addadmin': {
      action: function(user, userID, channelID, message, rawEvent) {
        bot.addAdmin(rawEvent.d.mentions[0].id);
      }
    },
    '/deladmin': {
      action: function(user, userID, channelID, message, rawEvent) {
        bot.delAdmin(rawEvent.d.mentions[0].id);
      }
    },
    '/nope': {
      action: function(user, userID, channelID, message, rawEvent) {
        bot.playTrack('nope.mp3');
        bot.getMessages({
          channel: config.channel,
          limit: 1
        }, function(error, messageArr) {
          if (error) return console.log(error);
        });
      }
    },
    '/ban': {
      action: function(user, userID, channelID, message, rawEvent) {
        bot.ban({
          target:rawEvent.d.mentions[0].id,
          channel:config.server
        });
      }
    },
    '/clear': {
      action: function(user, userID, channelID, message, rawEvent) {
        bot.deleteMessages(channelID);
      }
    }
  };
};
