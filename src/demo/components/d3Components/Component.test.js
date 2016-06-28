import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import {renderIntoDocument} from 'react-addons-test-utils';
import Component from './Component';
import Child from './ChildComponent';
import node from './../../d3-examples/bubbleChart';

describe('Component', () => {
	it('should render', () => {
		const item = renderIntoDocument(
			<Component />
		);
		expect(item).toExist();
	});

  it('calls componentWillReceiveProps', () => {
    const wrapper = mount(<Component />);
    expect(wrapper.props('data')).toEqual({});
    expect(wrapper.state().d3).toEqual('');
    wrapper.setProps({data: node});
    expect(wrapper.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
  });

  describe('<Component />', () => {
	  it('contains a <Child /> component', function () {
	    const wrapper = mount(<Component />);
	    expect(wrapper.find(Child)).toHave.length(1);
	  });
	});

});