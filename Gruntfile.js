module.exports = function(grunt) {
  grunt.initConfig({
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
            return dest + src.replace('-example.js','.js');
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
            return dest + src.replace('-example.json','.json');
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
            return dest + src.replace('-example.json','.json');
          }
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['copy:config', 'copy:info', 'copy:admin']);
};
