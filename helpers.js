module.exports = function(bot) {
  var fs = require('fs');
  var config = require('./config/config');
  bot.deleteMessages = function(channelID) {
    bot.getMessages({
      channel: channelID,
      limit: 100
    }, function(error, messageArr) {
      if (error) return console.log(error);
      messageArr.forEach(function(message) {
        bot.deleteMessage({
          channel: channelID,
          messageID: message.id
        });
      });
    });
  };
  bot.sendMessages = function(ID, messageArr, interval) {
    var callback, resArr = [],
      len = messageArr.length;
    typeof(arguments[2]) === 'function' ? callback = arguments[2]: callback = arguments[3];
    if (typeof(interval) !== 'number') interval = 1000;

    function _sendMessages() {
      setTimeout(function() {
        if (messageArr[0]) {
          bot.sendMessage({
            to: ID,
            message: messageArr.shift()
          }, function(err, res) {
            if (err) {
              resArr.push(err);
            } else {
              resArr.push(res);
            }
            if (resArr.length === len)
              if (typeof(callback) === 'function') callback(resArr);
          });
          _sendMessages();
        }
      }, interval);
    }
    _sendMessages();
  };
  bot.sendFiles = function(channelID, fileArr, interval) {
    var callback, resArr = [],
      len = fileArr.length;
    typeof(arguments[2]) === 'function' ? callback = arguments[2]: callback = arguments[3];
    if (typeof(interval) !== 'number') interval = 1000;

    function _sendFiles() {
      setTimeout(function() {
        if (fileArr[0]) {
          bot.uploadFile({
            to: channelID,
            file: fileArr.shift()
          }, function(err, res) {
            if (err) {
              resArr.push(err);
            } else {
              resArr.push(res);
            }
            if (resArr.length === len)
              if (typeof(callback) === 'function') callback(resArr);
          });
          _sendFiles();
        }
      }, interval);
    }
    _sendFiles();
  };
  bot.addAdmin = function(userID){
    var admins = JSON.parse(fs.readFileSync('./config/admins.json', 'utf8'));
    admins[userID] = true;
    var Admins = JSON.stringify(admins, null, 2);
    fs.writeFile('./config/admins.json', Admins, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log('Admins updated');
    });
  };
  bot.isAdmin = function(userID){
    var admins = JSON.parse(fs.readFileSync('./config/admins.json', 'utf8'));
    if (admins[userID]){
      return true;
    } else {
      return false;
    }
  };
  bot.playTrack = function(track){
    bot.joinVoiceChannel(config.voiceChannel, function() {
      bot.getAudioContext(config.voiceChannel, function(stream){
        stream.playAudioFile('./audio/' + track);
      });
    });
  };
};
