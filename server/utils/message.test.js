var expect = require( 'expect' );
var {generateMessage} = require( './message' );

describe( 'generateMessage', () => {
    it( 'Should generate the correct message object', () =>{
        var from = 'Danni';
        var text = 'Test message';
        var message = generateMessage( from, text );

        expect( typeof message.createdAt ).toBe( 'number' );
        expect( message ).toMatchObject( { from, text } );
    } )
});


