var child_process = require('child_process');

module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            server: {
                files: ['server/**/*.js', 'app.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');

    var child_express_app = child_process.fork('app');

    grunt.registerTask('default', ['watch']);

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln('Restarting Express Server');
        child_express_app.kill();
        child_express_app = child_process.fork('app');
    });
};
