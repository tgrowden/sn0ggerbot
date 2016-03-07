module.exports = function(bot, config, prompts) {
  bot.on('message', function(user, userID, channelID, message, rawEvent) {
    // no call/response for secondary bot
  });
};
