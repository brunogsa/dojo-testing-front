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
import CheckList from './CheckList';

/*
 * Suggested test structure
 */
describe('CheckList.test.js', () => {

  describe('HTML Semantics, SEO & Accessibility tests', () => {
    const mountedComponent = mount(
      <CheckList
        id="test"
        placeholderText="Place Holder Here"
        items={[]}

        onNewItem={() => {}}
        onCheck={() => {}}
        onUncheck={() => {}}
      />
    );

    it('has one <input type="text"> tag', () => {
      const textInputTags = mountedComponent.find('input[type="text"]');
      expect(textInputTags).toHaveLength(1);
    });

    // TODO
  });

  describe('Behavior tests', () => {
    // TODO
  });

  describe('Style tests', () => {
    // TODO
  });

});
