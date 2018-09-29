const expect = require( 'expect' );
const {Users} = require( './users' );

describe( 'Users', () => {
    var users;

    beforeEach( () => {
        users = new Users();
        users.users = [
            {
                id: 1,
                name: 'Ron',
                room: 'Node course'
            },
            {
                id: 2,
                name: 'Jen',
                room: 'Vue course'
            },
            {
                id: 3,
                name: 'Mike',
                room: 'Node course'
            }];
    });

    it( 'should add new user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: 'Boby',
            room: 'The office fans'
        }

        var response = users.addUser( user.id, user.name, user.room );
        expect( users.users.length ).toBe( 1 );
        expect( users.users[0] ).toMatchObject( response );
    } );


    it( 'should should remove a user', () => {
        var user = users.removeUser( 1 );
        expect( user.id ).toBe( 1 );
        expect( users.users.length ).toBe( 2 );
    });
    it( 'should should NOT remove user', () => {
        var user = users.removeUser( 99 );
        expect( users.users.length ).toBe( 3 );
        expect( typeof user ).toBe( 'undefined' );
    });


    it( 'should should find user', () => {
        var user = users.getUser( 1 );
        expect( user.name ).toBe( 'Ron' );
    });
    it( 'should should NOT find user', () => {
        var user = users.getUser( 99 );
        expect( typeof user ).toBe( 'undefined' );
    });


    it( 'should should return names array for Node course group', () => {
        var usersNames = users.getUserList( 'Node course' );
        expect( usersNames ).toMatchObject( ['Ron', 'Mike'] )
    });
    it( 'should should return Jen for Vue course group', () => {
        var usersNames = users.getUserList( 'Vue course' );
        expect( usersNames ).toMatchObject( ['Jen'] )
    });
});