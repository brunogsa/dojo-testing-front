/*
 * Required Modules
 */
import React from 'react';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

// XXX: You might need puppeteer

/*
 * Suggested setup to test a Component
 */
import CheckItem from './CheckItem';

/*
 * Suggested test structure
 */
describe('CheckItem.test.js', () => {

  describe('HTML Semantics, SEO & Accessibility tests', () => {
    // TODO
  });

  describe('Behavior tests', () => {

    it('Clicking anywhere on CheckItem invokes props.onClick with its ID', () => {
      const testData = {
        id: 'test',
        mockFunc: jest.fn(),
      };

      const mountedComponent = mount(
        <CheckItem
          id={testData.id}
          text="Test 123"
          isChecked
          onClick={testData.mockFunc}
        />
      );

      mountedComponent.find('.check-item-wrapper').simulate('click');
      expect(testData.mockFunc).toBeCalledWith(testData.id);
    });

  });

  describe('Style tests', () => {
    // TODO
  });

});
