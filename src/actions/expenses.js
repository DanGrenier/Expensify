import uuid from 'uuid';
import database from '../firebase/firebase'

//Components call action generator
//action generator returns an object
//component dispatches the object to the reducer
//The reducer changes the store

//ADD EXPENSE
export const addExpense = (expense) => ({
    
    type: 'ADD_EXPENSE',
    expense

    
  });

  export const startAddExpense = (expenseData = {}) => {
      return (dispatch, getState) => {
          const uid = getState().auth.uid;
          const {
              description = '',
              note = '',
              amount = 0,
              createdAt = 0
          } = expenseData;
          const expense = {description,note,amount,createdAt};
          return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
              dispatch(addExpense({
                  id: ref.key,
                  ...expense
              }));
          })

      };
  }
  
//REMOVE EXPENSE  
export const removeExpense = ({id} = {}) => ( {
      type: 'REMOVE_EXPENSE',
      id: id
  });

export const startRemoveExpense = ({id} = {}) =>  {
    return (dispatch,getState) => {
        const uid = getState().auth.uid;
        const refToRemove = database.ref(`users/${uid}/expenses/${id}`);
                return refToRemove
        .remove()
        .then( ()=> {
          dispatch(removeExpense({id}));
        });
    };
};   

//EDIT EXPENSE
export const editExpense= (id,updates) => ({
      type: "EDIT_EXPENSE",
      id: id,
      updates: updates
  });


  export const startEditExpense = (id,updates) => {
      return(dispatch,getState) => {
          const uid = getState().auth.uid;
          return database.ref(`users/${uid}/expenses/${id}`)
          .update(updates)
          .then( ()=> {
              dispatch(editExpense(id,updates))
          });
      };

  };

export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

//export const startSetExpenses;
export const startSetExpenses = () => {
    return (dispatch,getState) => {
        const uid = getState().auth.uid;
        
        return database.ref(`users/${uid}/expenses`)
          .once('value')
          .then((snapshot) => {
            const expenses = [];
            snapshot.forEach((childSnap) => {
                //console.log(childSnap.val());
              expenses.push({
                id: childSnap.key,
                ...childSnap.val()
                });
            });
            dispatch(setExpenses(expenses));
          })
    };
}


