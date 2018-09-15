var socket = io();
socket.on( 'connect', function() {
    console.log( 'Connected to the server' );
} );

socket.on( 'newMessage', function( message ) {
    console.log( `New message from: ${message.from}`, message );
    var li = jQuery( '<li></li>' );
    li.text( `${message.from}: ${message.text}` );
    jQuery( '.messages' ).append( li );
} );

socket.on( 'disconnect', function() {
    console.log( 'Disconnecting to the server' );
} );



jQuery( '.message-form' ).on( 'submit', function( e ) {
    e.preventDefault();
    var from = 'Roni';
    var text = jQuery( '.message' ).val();
    socket.emit( 'createMessage', {
        from: from,
        text: text
    }, function( msg ) {
        console.log( msg );
    });
} );