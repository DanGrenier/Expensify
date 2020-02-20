import React from "react";
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import ExpenseDashboard from '../components/ExpenseDashboard';
import LoginPage from '../components/LoginPage';
import AddExpense from '../components/AddExpense';
import EditExpense from '../components/EditExpense';
import NotFound from '../components/NotFound';
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'


export const history = createHistory();


const AppRouter = () => (
    <Router history = {history}>
    <div>
      
      <Switch>
        <PublicRoute path="/" exact ={true} component={LoginPage} />
        <PrivateRoute path="/dashboard" component={ExpenseDashboard} />
        <PrivateRoute path="/create" component={AddExpense}/>
        <PrivateRoute path="/edit/:id" component={EditExpense} />
                <Route component={NotFound} />
      </Switch>
      </div>
    </Router>
);
export default AppRouter;
