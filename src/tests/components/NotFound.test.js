import React from 'react';
import {shallow} from 'enzyme';
import NotFound from '../../components/NotFound';

test('It should render the Not Found page', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot();
})