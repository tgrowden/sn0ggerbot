var DiscordClient = require('discord.io');
var config = require('./config/config');
var _ = require('lodash');
var bot = new DiscordClient({
  autorun: true,
  email: config.email,
  password: config.password,
  channel: config.channel
});
// define call/response function
var prompts = require('./config/prompts');
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
//bot actions
bot.on('ready', function() {
  console.log(bot.username + " - (" + bot.id + ")");
  bot.connect(bot.channel);
});
bot.on('message', function(user, userID, channelID, message, rawEvent) {
  if (typeof callResponse(message, prompts.swear) !== 'undefined' && user != bot.username) {
    bot.sendMessage({
      to: channelID,
      message: callResponse(message, prompts.swear)
    });
  }
});
