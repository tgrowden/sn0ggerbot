module.exports = function(bot) {
  var fs = require('fs');
  var config = require('../config/config');
  bot.CallResponse = function(list, user, userID, channelID, message, rawEvent) {
    var callResponse = function(message, list) {
      var call = list.words;
      var response = list.responses;
      message = message.toLowerCase();
      if (call.some(function(v) {
          return message.indexOf(v) >= 0;
        })) {
        return response[Math.floor(Math.random() * response.length)];
      }
    };
    if (typeof callResponse(message, list) !== 'undefined' && user != bot.username) {
      bot.sendMessage({
        to: channelID,
        message: "@" + user + " " + callResponse(message, list)
      });
    }
  };
  bot.Kick = function(user, channel) {
    bot.kick({
      channel: channel,
      target: user
    }, function(err) {
      if (err) {
        bot.sendMessage({
          to: channel,
          message: "I'm sorry, Dave, I'm afraid I can't do that."
        });
      }
    });
  };
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
  bot.addAdmin = function(userID) {
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
  bot.delAdmin = function(userID) {
    var admins = JSON.parse(fs.readFileSync('./config/admins.json', 'utf8'));
    delete admins[userID];
    var Admins = JSON.stringify(admins, null, 2);
    fs.writeFile('./config/admins.json', Admins, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log('Admins updated');
    });
  };
  bot.isAdmin = function(userID) {
    var admins = JSON.parse(fs.readFileSync('./config/admins.json', 'utf8'));
    if (admins[userID]) {
      return true;
    } else {
      return false;
    }
  };
  bot.playTrack = function(track) {
      bot.getAudioContext(config.voiceChannel, function(stream) {
        stream.playAudioFile('./audio/' + track);
      });
  };
  bot.logInfo = function(rawEvent) {
    var OwnerID = rawEvent.d.guilds[0].owner_id;
    bot.addAdmin(OwnerID);
    var Roles = {
      name: 'Roles',
      data: JSON.stringify(rawEvent.d.guilds[0].roles, null, 2)
    };
    var Users = {
      name: 'Users',
      data: JSON.stringify(rawEvent.d.guilds[0].members, null, 2)
    };
    var Channels = {
      name: 'Channels',
      data: JSON.stringify(rawEvent.d.guilds[0].channels, null, 2)
    };
    [Roles, Users, Channels].forEach(function(role) {
      fs.writeFile('./server_info/' + role.name + '.json', role.data, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log(role.name + ' updated');
      });
      fs.writeFile('./server_info/Owner.json', OwnerID, function(err) {
        if (err) {
          return console.log(err);
        }
      });
    });
  };
  bot.isOwner = function(userID) {
    var owner = fs.readFileSync('./server_info/Owner.json', 'utf8');
    if (userID == owner) {
      return true;
    } else {
      return false;
    }
  };
};
