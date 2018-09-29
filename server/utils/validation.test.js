const expect = require( 'expect' );
const {isRealString} = require( './validation' );

describe( 'isRealString', () => {
    it( 'Should reject non string values', () =>{
        let result = isRealString( 75 );
        expect( result ).toBe( false );
    } );

    it( 'Should reject string only with space', () =>{
        let result = isRealString( '  ' );
        expect( result ).toBe( false );
    } );

    it( 'Should allow string with non-space characters', () =>{
        let result = isRealString( '  some string  ' );
        expect( result ).toBe( true );
    } );
});


