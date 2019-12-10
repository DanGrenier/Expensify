import React from 'react'
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import {filters, altFilters} from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(()=> {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters 
        filters={filters}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}/>);
});

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseListFilters with alt data correctly', () => {
    wrapper.setProps({filters : altFilters});
    expect(wrapper).toMatchSnapshot();
})

//should handle text change
test('should handle text changes', () => {
    const newText = "patate";
    wrapper.find('input').simulate('change', {target: {value: newText}});
    expect(setTextFilter).toHaveBeenLastCalledWith(newText)
})

//should sort by date
test('should handle sort by date', () => {
    const sortValue = "date";
    wrapper.find('select').simulate('change', {target: {value: sortValue}});
    expect(sortByDate).toHaveBeenCalled
})

//should sort by amount
test('should handle sort by amount', () => {
    const sortValue = "amount";
    wrapper.find('select').simulate('change', {target: {value: sortValue}});
    expect(sortByAmount).toHaveBeenCalled
})

//should handle date changes
test('should handle start date change', () => {
    wrapper.setProps({filters: altFilters});
    const sDate = moment(0);
    const eDate = moment(0).add(3,'days');
    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate: sDate, endDate: eDate});
    expect(setStartDate).toHaveBeenLastCalledWith(sDate);
    expect(setEndDate).toHaveBeenLastCalledWith(eDate);
})

test('should handle date focus changes',() => {
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused)
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused)  //can be null, startDate or endDate
})