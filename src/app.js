import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpense, removeExpense, editExpense} from './actions/expenses';
import {setTextFilter,sortByAmount,sortByDate,setStartDate,setEndDate} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss'   ;
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

store.dispatch(addExpense({description: "water bill", amount: 5000, createdAt: 4500}));
store.dispatch(addExpense({description:"Gas bill", amount: 15000, createdAt: 1000}));
store.dispatch(addExpense({description:"Rent", amount: 109500}));


const state = store.getState();

const exp = getVisibleExpenses(state.expenses,state.filters);


  
const jsx = (
    <Provider store={store}>
    <AppRouter />
    </Provider>

);

ReactDOM.render(jsx,document.getElementById("app"));
