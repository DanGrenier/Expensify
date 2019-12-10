import {addExpense, editExpense, removeExpense} from '../../actions/expenses';
import { encodeStream } from 'iconv-lite';

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
})

test(`should setup the edit expense action object`, () => {
    const action = editExpense('1234abc',{ note: 'New Note'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '1234abc',
        updates: {note: 'New Note'}
    });

})

test('should setup add expense action object with provided values', ()=> {
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'This was last months rent'
    };

    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
           ...expenseData,
           id: expect.any(String)  
        }
    })

})

test('should setup the add expense action object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    })

})