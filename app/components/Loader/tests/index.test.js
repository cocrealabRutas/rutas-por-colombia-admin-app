import React from 'react';
import { shallow } from 'enzyme';

import Loader from '../index';

describe('<Loader />', () => {
  it('should render correctly with no props', () => {
    const component = shallow(<Loader />);
    expect(component).toMatchSnapshot();
  });
});
