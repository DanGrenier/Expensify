import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';


test('should setup the default expenses state', () => {
  const state = expensesReducer(undefined,{type: '@@INIT'});
  expect(state).toEqual([])  ;  
})

test('should add an expense', ()=> {
  const expToAdd = {
    description: 'Gas bill',
    note: '',
    amount: 15000,
    createdAt: moment(0).valueOf()  
  };
  
  const action = {
      type: "ADD_EXPENSE",
      expense: expToAdd
  }    
  const state = expensesReducer(expenses,action);
  expect(state).toEqual([...expenses,expToAdd]);
})

test('should edit an expense by id', () => {
  const amount = 9999;    
  const action = {
      type: "EDIT_EXPENSE",
      id: expenses[0].id,
      updates: { amount: amount}
  };
  const state = expensesReducer(expenses,action);
  expect(state[0].amount).toBe(amount);
})

test('should not edit an expense if id not found', () => {
    const amount = 9999;
    const action = {
        type: "EDIT_EXPENSE",
        id: '-1',
        updates: { amount: amount}
    };
    const state = expensesReducer(expenses,action);
    expect(state).toEqual(expenses);
  })

test('should delete an expense by id', () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: expenses[0].id
    };
    const state = expensesReducer(expenses,action);
    expect(state).toEqual([expenses[1],expenses[2]]);
})

test('should not delete an expense if id not found', () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: '-1'
    };
    const state = expensesReducer(expenses,action);
    expect(state).toEqual(expenses);
})

test('should set expenses', () => {
    const action = {
        type: "SET_EXPENSES",
        expenses: expenses
    };
    const state = expensesReducer(expenses,action);
   expect(state).toEqual(expenses);
    
    

})