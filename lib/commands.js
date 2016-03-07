var _ = require('lodash');
var fs = require('fs');
module.exports = function(bot, config) {
  bot.commands = {
    '/booty': {
      action: function(user, userID, channelID, message, rawEvent) {
        bot.playTrack('booty.mp3');
        bot.getMessages({
          channel: config.channel,
          limit: 1
        }, function(error, messageArr) {
          if (error) return console.log(error);
        });
      }
    },
    '/jc': {
      action: function(user, userID, channelID, message, rawEvent) {
        bot.playTrack('cena.mp3');
        bot.getMessages({
          channel: config.channel,
          limit: 1
        }, function(error, messageArr) {
          if (error) return console.log(error);
        });
      }
    },
    '/yeah': {
      action: function(user, userID, channelID, message, rawEvent) {
        bot.playTrack('yeah.mp3');
        bot.getMessages({
          channel: config.channel,
          limit: 1
        }, function(error, messageArr) {
          if (error) return console.log(error);
        });
      }
    },
    '/wuba': {
      action: function(user, userID, channelID, message, rawEvent) {
        bot.playTrack('wuba.mp3');
        bot.getMessages({
          channel: config.channel,
          limit: 1
        }, function(error, messageArr) {
          if (error) return console.log(error);
        });
      }
    },
    '/wrecked': {
      action: function(user, userID, channelID, message, rawEvent) {
        bot.playTrack('wrecked.mp3');
        bot.getMessages({
          channel: config.channel,
          limit: 1
        }, function(error, messageArr) {
          if (error) return console.log(error);
        });
      }
    },
	'/admins': {
      action: function(user, userID, channelID, message, rawEvent) {
        var admins = JSON.parse(fs.readFileSync('./config/admins.json', 'utf8'));
        admins = _.keys(admins);
        for (var i = 0; i < admins.length; i++) {
          admins[i] = "<@" + admins[i] + ">";
        }
        console.log(admins);
        bot.sendMessage({
          to: channelID,
          message: "Admins:\n" + admins.join(' ')
        }, function(err, res){
          bot.fixMessage(res.id);
        });
      }
    },
    '/kick': {
      action: function(user, userID, channelID, message, rawEvent) {
        bot.Kick(rawEvent.d.mentions[0].id, config.server);
      }
    }
  };
};
