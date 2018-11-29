/*
 * Required Modules
 */
import React from 'react';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

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
  });

  describe('Behavior tests', () => {

    const testData = {
      items: [

        {
          id: 'itemA',
          text: 'Item A',
          isChecked: true,
        },

        {
          id: 'itemB',
          text: 'Item B',
          isChecked: false,
        },

        {
          id: 'itemC',
          text: 'Item C',
          isChecked: true,
        },

      ],
    };

    it('Providing 3 items will make .checklist-items.wrapper have 3 childs', () => {
      const mountedComponent = shallow(
        <CheckList
          id="test"
          placeholderText="Place Holder Here"
          items={testData.items}

          onNewItem={item => {}}
          onCheck={itemId => {}}
          onUncheck={itemId => {}}
        />
      );

      const wrapperChildren = mountedComponent.find('.checklist-items-wrapper').children();
      expect(wrapperChildren).toHaveLength(3);
    });

    it('Pressing Enter on the input invokes props.onNewItem with the typed text', () => {
      const testData = {
        textToType: 'This Dummy text is Amazing!',
        mockFunc: jest.fn(),
      };

      const mountedComponent = mount(
        <CheckList
          id="test"
          placeholderText="Place Holder Here"
          items={[]}

          onNewItem={item => {
            expect(item.id).toBeDefined();
            expect(item.text).toBe(testData.textToType);
            expect(item.isChecked).toBe(false);

            testData.mockFunc(item);
          }}

          onCheck={itemId => {}}
          onUncheck={itemId => {}}
        />
      );

      const textInputWrapper = mountedComponent.find('input[type="text"]').at(0);

      textInputWrapper.simulate('change', {
        target: {
          value: testData.textToType,
        },
      });

      textInputWrapper.simulate('keydown', {
        keyCode: 13, // ENTER
      });

      expect(testData.mockFunc).toHaveBeenCalled();
    });

    it('Pressing Enter on the input cleans its content', () => {
    });

  });

  describe('Style tests', () => {
    // Not so important for this component
  });

});
