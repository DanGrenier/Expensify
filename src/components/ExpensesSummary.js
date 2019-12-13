import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import pluralize from 'pluralize';
import numeral from 'numeral';

 export const ExpensesSummary = ({expenseCount, expenseTotal}) => {
    return (
    <div>
      <h1>Viewing {pluralize('expense',expenseCount,true)} totalling {numeral(expenseTotal / 100).format('$0,0.00')}</h1>
    </div>
    );
 };


 const mapStateToProps = (state) => {
     const visibleExpenses = selectExpenses(state.expenses, state.filters);
     console.log(visibleExpenses);

     return {
         expenseCount: visibleExpenses.length,
         expenseTotal: selectExpensesTotal(visibleExpenses)
     }
 }


export default connect(mapStateToProps)(ExpensesSummary);


