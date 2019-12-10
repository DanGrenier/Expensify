import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test ('Should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();

});

test('Should render Expenseform with proper data', () => {
    const wrapper = shallow(<ExpenseForm expense = {expenses[0]} /> );
    expect(wrapper).toMatchSnapshot();
});


test('Should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
   wrapper.find('form').simulate('submit', {
       preventDefault: () => { }
   });
   expect(wrapper.state('errorMsg').length).toBeGreaterThan(0);
   expect(wrapper).toMatchSnapshot();

});

test(`should set description on input change`, () => {
    const value = "New Desc";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {
        target: {value}
    });
    expect(wrapper.state('description')).toBe(value);
})

test('should set note on input change', () => {
    const note = "New note";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').at(0).simulate('change', {
        target: {value: note}
    });
    expect(wrapper.state('note')).toBe(note)
})

test('should set amount if valid input', () => {
    const valid_amount = '23.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: {value: valid_amount}  });
    expect(wrapper.state('amount')).toBe(valid_amount);
})

test('should not set amount if invalid input', () => {
    const invalid_amount = '22.345';
    const wrapper = shallow(<ExpenseForm />);
    const current_amount = wrapper.state('amount');
    wrapper.find('input').at(1).simulate('change', { 
        target: {value: invalid_amount} });
        expect(wrapper.state('amount')).toBe(current_amount);
})

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {} });
        expect(wrapper.state('errorMsg')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });

});

test('should test new date on date change', ()=> {
    const wrapper = shallow(<ExpenseForm />);
    const now = moment();
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
})

test('should set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toBe(focused);
})