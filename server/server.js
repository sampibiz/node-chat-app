const express = require( 'express' );
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');


const publicPath = path.join( __dirname, '../public' );
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer( app );
var io = socketIO( server );
app.use( express.static( publicPath ) );

io.on( 'connection', ( socket ) => {
    console.log( 'New user connection' );

    socket.emit( 'newMessage', {
        from: 'Admin',
        text: 'Welcome to our chat',
        createdAt: new Date().getTime()
    } );

    socket.broadcast.emit( 'newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    } );

    socket.emit( 'newMessage', {
        from: 'Michael',
        text: 'New message',
        createdAt: new Date().getTime()
    } );

    socket.on( 'createMessage', ( message ) => {
        console.log( 'Create message:', message );

        io.emit( 'newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        } );
    });

    socket.on( 'disconnect', ( socket ) => {
        console.log( 'User Disconnect' );
    } );
} );



server.listen( port, () => {
    console.log( `Server is running on port ${port}` );
});
