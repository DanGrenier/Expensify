import {login, logout} from '../../actions/auth';

test('should generate a login action object', () => {
  const uid = 1234;
  const action = login(uid) ;
  expect(action).toEqual({
      type: "LOGIN",
      uid: uid
  })    

});

test('should generate a logout action object', () => {
    const action = logout();
    expect(action).toEqual({
        type: "LOGOUT",
        
    })

});

