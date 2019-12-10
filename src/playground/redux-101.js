import {createStore} from 'redux';

const incrementCount = ({incrementBy = 1} = {}) => (
    {type: "INCREMENT",
    incrementBy: incrementBy});


const decrementCount = ({decrementBy = 1} = {}) => (
    {type: "DECREMENT",
    decrementBy: decrementBy}
);

const resetCount = () => ({
    type: "RESET"
});

const setCount = ({count }) => (
    {type: "SET",
     count: count}
);

const countReducer = (state={count: 0}, action) => {
    switch (action.type){
      case "INCREMENT":
      const incrementBy = action.incrementBy
        return {
          count: state.count + incrementBy
        };
      case "DECREMENT":
      
      return {
          count: state.count - action.decrementBy
      };
      case "RESET":
      return {
          count: 0
      };
      case "SET":
      return {
          count: action.count
      };
      default:
        return state;
      }
  } 

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
   console.log(store.getState());
});


//store.dispatch({ type: 'INCREMENT', incrementBy: 5});
store.dispatch(incrementCount({incrementBy: 5}))

store.dispatch(incrementCount());
store.dispatch(resetCount());
store.dispatch(decrementCount({decrementBy: 2}));
store.dispatch(decrementCount());
store.dispatch(setCount({count: 101}));

