var express = require('express');
var bodyParser = require('body-parser');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var socketioJWT = require('socketio-jwt');

var io = require('socket.io');
var socketEvents = require('./server/socketEvents.js'); //socket events
var MongoClient = require('mongodb').MongoClient;

var app = express();

// parse application/json
app.use(bodyParser.json());

var url = 'mongodb://localhost:27017/simple-chat';

MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log('Failed to connecto to MongoDB');
        return;
    }
    console.log('Successfully connected to MongoDB');

    //create email index for faster searches
    db.collection('users').createIndex({
        email: 1
    }, {
        unique: true,
        name: 'email'
    });

    app.post('/api/signup', function(req, res) {
        //check if email is in use
        db.collection('users').findOne({
            email: req.body.email
        }, function(err, user) {
            if (user) { //user already exists return error
                return res.status(400).send({
                    error: {
                        type: 'email',
                        message: 'Email already in use.'
                    }
                });
            }

            db.collection('users').save({
                email: req.body.email,
                password: req.body.password
            }, function(err, user) {
                var token = jwt.sign({
                    email: req.body.email
                }, 'simple-chat');
                res.json({
                    token: token
                });
            });
        });
    });

    app.post('/api/login', function(req, res) {
        db.collection('users').findOne({
            email: req.body.email
        }, function(err, user) {
            if (err) return res.status(400).send(err);
            if (user.password === req.body.password) {
                var token = jwt.sign({
                    email: req.body.email
                }, 'simple-chat');
                res.json({
                    token: token
                });
            } else {
                res.status(401).send({
                    error: {
                        type: 'password',
                        message: 'Invalid credentials'
                    }
                });
            }
        });
    });
});

app.use(express.static(__dirname + '/client'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

var server = app.listen(3000, function() {
    console.log('Express server listening on port', 3000);
});

//initialize socket
io = io(server);
io.use(socketioJWT.authorize({
    secret: 'simple-chat',
    handshake: true
}));
socketEvents(io);
