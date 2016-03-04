// bot commands
module.exports = {
  '/booty': {
    action: function(user, userID, channelID, message, rawEvent) {
      bot.playTrack('booty.mp3');
    }
  },
  '/cena': {
    action: function(user, userID, channelID, message, rawEvent) {
      bot.playTrack('cena.mp3');
    }
  },
};
