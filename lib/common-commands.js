var _ = require('lodash');
var fs = require('fs');
module.exports = function(bot, config) {
  bot.commonCommands = {
    '/weather': {
      action: function(user, userID, channelID, message, rawEvent) {
        bot.getWeather(message.substring(9), channelID);
      }
    }
  };
};
