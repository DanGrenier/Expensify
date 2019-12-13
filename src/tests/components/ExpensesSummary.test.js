import React from 'react';
import { shallow } from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';


test('It should render ExpensesSummary for one expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expenseTotal={12000} />);
    expect(wrapper).toMatchSnapshot();
})

test('It should render ExpensesSummary for multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={expenses.length} expenseTotal={120000} />);
    expect(wrapper).toMatchSnapshot();
})