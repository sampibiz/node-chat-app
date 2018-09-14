const express = require( 'express' );
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

var {generateMessage} = require( './utils/message' );

const publicPath = path.join( __dirname, '../public' );
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer( app );
var io = socketIO( server );
app.use( express.static( publicPath ) );

io.on( 'connection', ( socket ) => {
    console.log( 'New user connection' );

    socket.emit( 'newMessage', generateMessage( 'Admin', 'Welcome to our chat' ) );


    socket.broadcast.emit( 'newMessage', generateMessage( 'Admin', 'New user joined' ) );

    socket.emit( 'newMessage', generateMessage( 'Michael', 'New message' ) );

    socket.on( 'createMessage', ( message ) => {
        console.log( 'Create message:', message );

        io.emit( 'newMessage', generateMessage( message.from, message.text ) );
    });

    socket.on( 'disconnect', ( socket ) => {
        console.log( 'User Disconnect' );
    } );
} );



server.listen( port, () => {
    console.log( `Server is running on port ${port}` );
});
