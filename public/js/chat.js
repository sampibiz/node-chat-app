var socket = io();
socket.on( 'connect', function() {
    console.log( 'Connected to the server' );
    var params = jQuery.deparam( window.location.search );

    socket.emit( 'join', params, function(err){
        if( err ){
            alert( err );
            window.location.href = '/';
        } else {
            console.log( 'No error!' );
        }
    } );
} );

socket.on( 'newMessage', function( message ) {
    var formattedTime  = moment( message.createdAt ).format( 'h:mm a' );
    var template = jQuery( '#message-template' ).html();
    var html = Mustache.render( template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    } );

    jQuery( '.messages' ).append( html  );
} );


socket.on( 'disconnect', function() {
    console.log( 'Disconnecting to the server' );
} );

socket.on('updateUserList', function (users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});

jQuery( '.message-form' ).on( 'submit', function( e ) {
    e.preventDefault();
    var text = jQuery( '.user-message' ).val();
    socket.emit( 'createMessage', {
        text: text
    }, function( msg ) {
        console.log( msg );
    });
} );