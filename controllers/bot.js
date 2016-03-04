module.exports = function(bot, config, prompts) {
  //bot connect
  var fs = require('fs');
  bot.on("ready", function(rawEvent) {
    console.log("Connected!");
    console.log("Logged in as: ");
    console.log(bot.username + " - (" + bot.id + ")");
    bot.sendMessage({
      to: config.channel,
      message: "Sup bitches?"
    });
    bot.logInfo(rawEvent);
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
