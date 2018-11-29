/*
 * Required Modules
 */
import React from 'react';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import puppeteer from 'puppeteer';
let browser;
let page;

/*
 * Suggested setup to test a Component
 */
import CheckItem from './CheckItem';

// Get the iframe of your storybook component
const storybookUrls = {
  checked: 'http://localhost:9001/iframe.html?selectedKind=CheckItem&selectedStory=static%3A%20checked',
  notChecked: 'http://localhost:9001/iframe.html?selectedKind=CheckItem&selectedStory=static%3A%20not%20checked',
};

/*
 * Suggested test structure
 */
describe('CheckItem.test.js', () => {

  describe('HTML Semantics, SEO & Accessibility tests', () => {
    const testData = {
      text: 'Wash your clothes',
    };

    const mountedComponent = mount(
      <CheckItem
        id="test"
        text={testData.text}
        isChecked={false}
        onClick={() => {}}
      />
    );

    it('has one <input type="checkbox">', () => {
      const inputTags = mountedComponent.find('input[type="checkbox"]');
      expect(inputTags).toHaveLength(1);
    });

    it('has one <p> tag with the provided text', () => {
      const pTags = mountedComponent.find('p');
      expect(pTags).toHaveLength(1);

      const tagText = pTags.at(0).text();
      expect(tagText).toBe(testData.text);
    });
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

    beforeAll(async () => {
      browser = await puppeteer.launch();
      page = await browser.newPage();
    });

    it('When isChecked = true, <p> has text-decoration = line-throught', async () => {
      await page.goto(storybookUrls.checked);

      const itemDecoration = await page.evaluate(() => {
        return window.getComputedStyle(
          document.querySelector('.check-item-text')
        )['text-decoration'];
      });

      expect(itemDecoration).toMatch('line-through');
    });

    it('When isChecked = false, <p> has no text-decoration', async () => {
      await page.goto(storybookUrls.notChecked);

      const itemDecoration = await page.evaluate(() => {
        return window.getComputedStyle(
          document.querySelector('.check-item-text')
        )['text-decoration'];
      });

      expect(itemDecoration).toMatch('none');
    });

    afterAll(async () => {
      await browser.close();
    });

  });

});
