module.exports = function(io) {

    io.on('connection', function(socket) {
        console.log('New connection from', socket.handshake.address, '@ ', socket.handshake.time);

        socket.on('message', function(data) {
            socket.emit('message', {
                message: Date.now()
            });
        });

    });

};
