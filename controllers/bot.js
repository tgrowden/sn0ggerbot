module.exports = function(bot, config, prompts) {
  //bot connect
  var fs = require('fs');
  bot.on("ready", function(rawEvent) {
    console.log("Connected!");
    console.log("Logged in as: ");
    console.log(bot.username + " - (" + bot.id + ")");
    bot.joinVoiceChannel(config.voiceChannel, function() {});
    bot.logInfo(rawEvent); //Custom helper to log server info and make server owner a bot admin
  });
  bot.on("disconnected", function() {
    console.log("Bot disconnected");
    bot.connect(); //Auto reconnect
  });
  if (config.debug) {
    bot.on("debug", function(data) {
      console.log(JSON.stringify(data, null, 2));
    });
  }
};
