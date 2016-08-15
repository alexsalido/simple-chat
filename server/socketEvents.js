module.exports = function(io) {

    io.on('connection', function(socket) {
        console.log(socket);
        console.log('New connection from', socket.handshake.address, '@ ', socket.handshake.time);

        socket.on('message', function(data) {
            console.log(data);
        });

    });

};
