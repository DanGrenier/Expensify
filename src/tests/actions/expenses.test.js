import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, startEditExpense,editExpense, startRemoveExpense,removeExpense, setExpenses, startSetExpenses} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisIsMyTestUID';
const defaultAuthState = {auth: { uid }};
const createMockStore = configureMockStore([thunk]);

beforeEach((done)=> {
    const expenseData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expenseData[id] = {description, note, amount, createdAt};
    });
    database.ref(`users/${uid}/expenses`).set(expenseData).then(()=> done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
})

test('should remove expense to database and store', (done)=> {
    const store = createMockStore(defaultAuthState);
    const expenseId = {id: expenses[0].id};
    store.dispatch(startRemoveExpense(expenseId)).then(()=>  {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id: expenseId.id });

    })

    return database.ref(`users/${uid}/expenses/${expenseId.id}`).once('value')
    .then((snapshot)=> {
        expect(snapshot.exists()).toEqual(false);
        done();
    })
})

test(`should setup the edit expense action object`, () => {
    const action = editExpense('1234abc',{ note: 'New Note'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '1234abc',
        updates: {note: 'New Note'}
    });

})

test('should update expense in database and store',(done)=>{
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id
    const updates = {amount: 21045};
    store.dispatch(startEditExpense(id,updates)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id: id,
            updates: updates
        });
    })

    
        const ref = database.ref(`users/${uid}/expenses/${id}`)
        ref.once('value')
        .then((snapshot)=>{
            expect(snapshot.val().amount).toBe(updates.amount);
            done();
        });
        
        
    

});

 test('should setup add expense action object with provided values', ()=> {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
})



test('should add expense to database and store', (done)=>{
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: "Mouse",
        amount: 3000,
        note: "This one is better",
        createdAt: 1000
    };
    
    store.dispatch(startAddExpense(expenseData)).then(()=> {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot)=>{
            expect(snapshot.val()).toEqual(expenseData);
            done();
        
    });

});

test('should add expense to database and store with default values', (done)=>{
    const store = createMockStore(defaultAuthState);
    const defaultExpense = {
      description : '',
        note : '',
        amount : 0,
        createdAt : 0
    };
    store.dispatch(startAddExpense({})).then(()=> {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultExpense
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot)=>{
            expect(snapshot.val()).toEqual(defaultExpense);
            done();
        
    });

});

test('Should set the proper action for Set expense', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
      type: 'SET_EXPENSES',
      expenses
  });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type : 'SET_EXPENSES',
            expenses
        });
        done();
    });
});