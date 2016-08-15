var express = require('express');
var app = express();
var io = require('socket.io');
var socketEvents = require('./server/socketEvents.js'); //socket events

app.use(express.static(__dirname + '/client'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

var server = app.listen(3000, function() {
    console.log('Express server listening on port', 3000);
});

//initialize socket
socketEvents(io(server));
