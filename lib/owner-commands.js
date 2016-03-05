var _ = require('lodash');
var fs = require('fs');
module.exports = function(bot, config) {
  bot.ownerCommands = {
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
