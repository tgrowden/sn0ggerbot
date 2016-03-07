module.exports = function(grunt) {
  grunt.initConfig({
    mkdir: {
      all: {
        options: {
          mode: 0755,
          create: ['audio']
        }
      }
    },
    curl: {
      'audio/wuba.mp3': 'http://peal.io/download/i9ixe',
      'audio/balls.mp3': 'http://peal.io/download/vowb2',
      'audio/ants.mp3': 'http://peal.io/download/4ate4',
      'audio/butthole.mp3': 'http://peal.io/download/esmql',
      'audio/gross.mp3': 'http://peal.io/download/s8w8y',
      'audio/schwifty.mp3': 'http://peal.io/download/vmvf3',
      'audio/showme.mp3': 'http://peal.io/download/ah392',
      'audio/rekt.mp3': 'http://peal.io/download/3tcbx',
      'audio/booty.mp3': 'http://bluesnogbox.duckdns.org/audio/booty.mp3',
      'audio/cena.mp3': 'http://bluesnogbox.duckdns.org/audio/cena.mp3',
      'audio/yeah.mp3': 'http://bluesnogbox.duckdns.org/audio/yeah.mp3'
    },
    copy: {
      config: {
        files: [{
          expand: true,
          cwd: 'config/', // set working folder / root to copy
          dot: true,
          dest: 'config/', // destination folder
          src: [
            'config-example.js'
          ],
          rename: function(dest, src) {
            return dest + src.replace('-example.js', '.js');
          }
        }]
      },
      info: {
        files: [{
          expand: true,
          cwd: 'server_info/', // set working folder / root to copy
          dot: true,
          dest: 'server_info/', // destination folder
          src: [
            'Channels-example.json', 'Roles-example.json', 'Users-example.json', 'Owner-example.json'
          ],
          rename: function(dest, src) {
            return dest + src.replace('-example.json', '.json');
          }
        }]
      },
      admin: {
        files: [{
          expand: true,
          cwd: 'config/', // set working folder / root to copy
          dot: true,
          dest: 'config/', // destination folder
          src: [
            'admins-example.json'
          ],
          rename: function(dest, src) {
            return dest + src.replace('-example.json', '.json');
          }
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['copy:config', 'copy:info', 'copy:admin']);
  grunt.registerTask('audio', ['mkdir', 'curl']);
};
