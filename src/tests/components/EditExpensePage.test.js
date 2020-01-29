import React from 'react';
import { shallow } from 'enzyme';
import {EditExpense} from '../../components/EditExpense';
import expenses from '../fixtures/expenses';

let startEditExpense , startRemoveExpense, wrapper, history;

beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = {push: jest.fn()};
  wrapper = shallow(<EditExpense expense={expenses[1]} 
                    startEditExpense={startEditExpense}
                    startRemoveExpense={startRemoveExpense}
                    history={history} />);
 })


test('should render the EditExpense component', () => {
  expect(wrapper).toMatchSnapshot();
})

test('should habdle on Submit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[1].id,expenses[1])
})

test('should handle onRemove', () => {
  wrapper.find('button').simulate('click')
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expenses[1].id})

})