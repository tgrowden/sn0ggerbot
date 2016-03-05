module.exports = function(bot, config, prompts) {
  var _ = require('lodash');
  var callResponse = function(message, prompt) {
    var call = prompt.words;
    var response = prompt.responses;
    message = message.toLowerCase();
    if (call.some(function(v) {
        return message.indexOf(v) >= 0;
      })) {
      return response[Math.floor(Math.random() * response.length)];
    }
  };
  bot.on('message', function(user, userID, channelID, message, rawEvent) {
    var msgArr = message.split(' ');
    // Check if command is coming from bot owner
    if (bot.isOwner(userID, rawEvent)) {
      if (msgArr[0] == '/help'){
        var owner_keys = _.keys(bot.ownerCommands);
        bot.sendMessage({
          to: channelID,
          message: "Owner Commands: \n" + owner_keys.join("\n")
        });
      } else if (bot.ownerCommands.hasOwnProperty(msgArr[0])) {
        bot.ownerCommands[msgArr[0]].action(user, userID, channelID, message, rawEvent);
      }
    }
    // Check if command is coming from bot admin
    if (bot.isAdmin(userID, rawEvent)) {
      if (msgArr[0] == '/help'){
        var keys = _.keys(bot.commands);
        bot.sendMessage({
          to: channelID,
          message: "Commands: \n" + keys.join("\n")
        });
      } else if (bot.commands.hasOwnProperty(msgArr[0])) {
        bot.commands[msgArr[0]].action(user, userID, channelID, message, rawEvent);
      }
    }
    var list = prompts.swear; //define key to look for
    if (typeof callResponse(message, list) !== 'undefined' && user != bot.username) {
      bot.sendMessage({
        to: channelID,
        message: "@" + user + " " + callResponse(message, list)
      });
    }
  });
};
