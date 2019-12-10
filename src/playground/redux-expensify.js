import {createStore , combineReducers} from 'redux';
import uuid from 'uuid';
//ADD EXPENSE
const addExpense = ({description = '', note='', amount = 0, createdAt = 0 } = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
      id: uuid(),
      description: description,
      note: note,
      amount: amount,
      createdAt: createdAt
  }
});

const removeExpense = ({id} = {}) => ( {
    type: 'REMOVE_EXPENSE',
    id: id
});

const editExpense= (id,updates) => ({
    type: "EDIT_EXPENSE",
    id: id,
    updates: updates
});


const setTextFilter =(text = ``) => ({
    type: "SET_TEXT_FILTER",
    text: text
    
});

const sortByAmount = () =>({
    type: "SORT_BY_AMOUNT"
});

const sortByDate = () =>({
    type: "SORT_BY_DATE"
});

const setStartDate = (startDate) =>({
    type: "SET_START_DATE",
    startDate: startDate
});

const setEndDate = (endDate) => ({
    type: "SET_END_DATE",
    endDate: endDate
});


//SET START DATE
//SET END DATE

//Expense Reducer

const expenseReducerDefaultState = [];
const expensesReducer = (state = expenseReducerDefaultState, action) => {
    switch (action.type){
        case "ADD_EXPENSE":
          return [...state,action.expense]
        case "REMOVE_EXPENSE":
          return state.filter((expense)=>{
              return action.id !== expense.id; })
        case "EDIT_EXPENSE":
          return state.map((expense)=>{
            if (expense.id === action.id){
               return {...expense,
               ...action.updates}   
            }
            else{return expense;}
          })
        default: 
        return state;
    }

}
//Filters reducer
const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filterReducerDefaultState, action  ) => {
    switch(action.type){
        case "SET_TEXT_FILTER":
        return {...state,text:action.text}
        case "SORT_BY_AMOUNT":
        return {...state, sortBy: 'amount'}
        case "SORT_BY_DATE":
        return {...state, sortBy: 'date'}
        case "SET_START_DATE":
        return {...state, startDate: action.startDate}
        case "SET_END_DATE":
        return{...state, endDate: action.endDate}
        default: 
        return state;
    }

}

//Store creationg
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
 );

//timestamps
//positive or negative integers
//timestamp 0 represents january 1st 1970 (unix epoch)
//couting based on milliseconds
//33400 milliseconds after january 1st 1970

const getVisibleExpenses = (expenses,{text,sortBy,startDate,endDate}) => {
  return expenses.filter((expense) => {
      const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
      const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
      const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

      //figure out if expense.description has the text variable string inside of it
      //includes 
      //convert both strings to lowercase
      return startDateMatch && endDateMatch && textMatch;

  }).sort((a,b) => {
      console.log(sortBy);
      if(sortBy === 'date'){
          return a.createdAt < b.createdAt ? 1 : -1;
      }else if(sortBy === 'amount'){
          return a.amount < b.amount ? 1 : -1;
      }
  });

};

store.subscribe(() =>{
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
    console.log(visibleExpenses);
});

 const expense1 = store.dispatch(addExpense({description: 'rent', amount: 100, createdAt: -21000}));
 const expense2 = store.dispatch(addExpense({description: 'Coffee', amount: 300,createdAt: -1000}));

// store.dispatch(removeExpense({id: expense2.expense.id}));
// store.dispatch(editExpense(expense1.expense.id, {amount: 500}));


 //store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter(''));

 store.dispatch(sortByAmount());
 //store.dispatch(sortByDate());

//store.dispatch(setStartDate(0));
//store.dispatch(setStartDate());

//store.dispatch(setEndDate(999));





const demoState = {
    expenses: [{
        id: 'someid',
        desription: 'January Rent',
        note: 'Last payment before rate goes up',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
};



