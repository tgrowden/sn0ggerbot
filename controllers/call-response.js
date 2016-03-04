module.exports = function(bot, config, prompts) {
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
    if (bot.isAdmin(userID)) {
      if (msgArr[0] == "/booty") {
        bot.playTrack('booty.mp3');
      }
      if (msgArr[0] == "/cena" || msgArr[0] == "/jc") {
        bot.playTrack('cena.mp3');
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
