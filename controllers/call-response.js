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
