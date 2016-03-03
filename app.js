var DiscordClient = require('discord.io');
var config = require('./config/config');
var prompts = require('./config/prompts');
var _ = require('lodash');
var bot = new DiscordClient({
  autorun: true,
  email: config.email,
  password: config.password,
  channel: config.channel
});
require('./helpers')(bot);
// Loader to use all controllers
var normalizeControllers = require('path').join(__dirname, "controllers");
require('fs').readdirSync(normalizeControllers).forEach(function(file) {
  require('./controllers/' + file)(bot, config, prompts);
});
