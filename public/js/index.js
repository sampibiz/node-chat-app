var socket = io();
socket.on( 'connect', function() {
    console.log( 'Connected to the server' );
    socket.emit( 'createMessage', {
        from: 'Boaz',
        text: 'Great!'
    });
} );

socket.on( 'newMessage', function( message ) {
    console.log( `New message from: ${message.from}`, message );
} );

socket.on( 'disconnect', function() {
    console.log( 'Disconnecting to the server' );
} );