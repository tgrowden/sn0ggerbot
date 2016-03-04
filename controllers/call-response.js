module.exports = function(bot, config, prompts) {
  var commands = require('./commands');
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
    //console.log("Message: " + JSON.stringify(rawEvent, null, 2));
    var msgArr = message.split(' ');
    if (bot.isAdmin(userID, rawEvent)) {
      /*if (msgArr[0] == '/botadmin'){
        bot.addAdmin(rawEvent.d.mentions[0].id);
      }
      if (msgArr[0] == "/booty") {
        bot.playTrack('booty.mp3');
      }
      if (msgArr[0] == "/cena" || msgArr[0] == "/jc") {
        bot.playTrack('cena.mp3');
      }*/
      if (commands.hasOwnProperty(msgArr[0])) {
        commands[msgArr[0]].action(user, userID, channelID, message, rawEvent);
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
