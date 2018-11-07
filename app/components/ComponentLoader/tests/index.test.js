import React from 'react';
import { shallow } from 'enzyme';
import ComponentLoader from '../index';

describe('<ComponentLoader />', () => {
  it('should render correctly with no props', () => {
    const component = shallow(<ComponentLoader />);
    expect(component).toMatchSnapshot();
  });
});
