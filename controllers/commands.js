module.exports = function(bot, config, prompts) {
  var _ = require('lodash');
  bot.on('message', function(user, userID, channelID, message, rawEvent) {
    var msgArr = message.split(' ');
    // Check if command is coming from bot owner
    if (bot.isOwner(userID, rawEvent)) {
      if (bot.ownerCommands.hasOwnProperty(msgArr[0])) {
        bot.ownerCommands[msgArr[0]].action(user, userID, channelID, message, rawEvent);
      }
    }
    // Check if command is coming from bot admin
    if (bot.isAdmin(userID, rawEvent)) {
      if (bot.commands.hasOwnProperty(msgArr[0])) {
        bot.commands[msgArr[0]].action(user, userID, channelID, message, rawEvent);
      }else if (bot.ownerCommands.hasOwnProperty(msgArr[0]) && !bot.isOwner(userID)) {
        bot.sendMessage({
          to: channelID,
          message: "I'm sorry, Dave, I'm afraid I can't do that."
        });
      }
    } else {
      if (bot.commands.hasOwnProperty(msgArr[0]) || bot.ownerCommands.hasOwnProperty(msgArr[0])) {
        bot.sendMessage({
          to: channelID,
          message: "I'm sorry, Dave, I'm afraid I can't do that."
        });
      }
    }
  });
};
