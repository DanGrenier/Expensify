import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
    const exp = [];
   
    const result = selectExpensesTotal(exp);
    expect(result).toEqual(0);
   
   })
   
   test('should correctly add a single expense', () => {
     const result = selectExpensesTotal([expenses[0]]);
     expect(result).toEqual(expenses[0].amount);
   })

   test('should correctly add multiple expenses', () => {
    const tot = expenses.reduce((prev,cur) => {
        return prev + cur.amount;
    },0)
  
    const result = selectExpensesTotal(expenses);
    expect(result).toEqual(tot);
  })

   





