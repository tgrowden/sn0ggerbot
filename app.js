var DiscordClient = require('discord.io');
var config = require('./config/config');
var prompts = require('./config/prompts');
var fs = require('fs');
var bot = new DiscordClient({
  autorun: true,
  email: config.email,
  password: config.password,
  channel: config.channel
});
require('./lib/helpers')(bot);
require('./lib/commands')(bot, config);
require('./lib/owner-commands')(bot, config);
require('./lib/common-commands')(bot, config);
// Loader to use all controllers
var normalizeControllers = require('path').join(__dirname, "controllers");
require('fs').readdirSync(normalizeControllers).forEach(function(file) {
  require('./controllers/' + file)(bot, config, prompts);
});


var Forecast = require('forecast');
//var config = require('./config/config');
var geocoder = require('node-geocoder')('google', 'http');
var moment = require('moment');
var forecast = new Forecast({
  service: 'forecast.io',
  key: config.forcast_io_key,
  units: 'f', // Only the first letter is parsed
  cache: true, // Cache API requests?
  ttl: { // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
    minutes: 27,
    seconds: 45
  }
});
bot.getWeather("new york");
