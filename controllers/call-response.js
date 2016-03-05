module.exports = function(bot, config, prompts) {
  bot.on('message', function(user, userID, channelID, message, rawEvent) {
    // custom call-response handlers from ../config/prompts.js
    bot.CallResponse(prompts.swear, user, userID, channelID, message, rawEvent);
    bot.CallResponse(prompts.table, user, userID, channelID, message, rawEvent);
  });
};
