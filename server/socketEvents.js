module.exports = function(io) {

    io.on('connection', function(socket) {
        console.log('New connection from', socket.handshake.address, '@ ', socket.handshake.time, 'by ', socket.decoded_token.email);

        socket.on('message', function(data) {
            setTimeout(function() {
                socket.emit('message', {
                    message: Date.now()
                });
            }, 500);
        });

    });

};
