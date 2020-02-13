import authReducer  from '../../reducers/auth';

test('should setup default values', () => {
  const state = authReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual( {})    
});

test('should set uid for login', () => {
    const action = {type: 'LOGIN', uid: 'abc123'};
    const currentState = {};
    
    const state = authReducer(currentState, action);
    expect(state.uid).toBe(action.uid);
})

test('should clear uid for logout', () => {
    const currentState = {
      uid: 'abc123'
    };
    const action = {type: 'LOGOUT'};
    const state = authReducer(currentState,action);
    expect(state).toEqual({});
})

