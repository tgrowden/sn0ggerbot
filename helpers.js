module.exports = function(bot) {
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
};
