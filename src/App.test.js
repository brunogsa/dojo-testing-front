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
import App from './App';

// Get the iframe of your storybook component
const storybookUrl = 'http://localhost:9001/iframe.html?selectedKind=App&selectedStory=receives%20no%20props';

/*
 * Suggested test structure
 */
describe('App.test.js', () => {

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();

    await page.goto(storybookUrl);
  })

  describe('HTML Semantics, SEO & Accessibility tests', () => {
    const mountedComponent = mount(
      <App />
    );

    it('has one <main> tag', () => {
      const mainTags = mountedComponent.find('main');
      expect(mainTags).toHaveLength(1);
    });

    it('has 2 <section> tags inside <main>', () => {
      const mainTag = mountedComponent.find('main');
      const sectionTags = mainTag.find('section');
      expect(sectionTags).toHaveLength(2);
    });

    it('has a <h2> inside each <section>', () => {
      const sectionTags = mountedComponent.find('section');

      sectionTags.forEach(sectionTag => {
        const h2Tags = sectionTag.find('h2');
        expect(h2Tags).toHaveLength(1);
      });
    });
  });

  describe('Behavior tests', () => {
    const testData = {
      itemA: {
        id: 'itemA',
        text: 'Item A',
        isChecked: false,
      },
    };

    it('state.checkedItems starts as an empty array', () => {
      const mountedComponent = mount(
        <App />
      );

      expect(mountedComponent.state().checkedItems).toHaveLength(0);
    });

    it('state.uncheckedItems starts as an empty array', () => {
      const mountedComponent = mount(
        <App />
      );

      expect(mountedComponent.state().uncheckedItems).toHaveLength(0);
    });

    it('Invoking handleNewTodoItem adds an unchecked item to state.uncheckedItems', () => {
      const mountedComponent = mount(
        <App />
      );

      const initialNumOfUncheckedItems = mountedComponent.state().uncheckedItems.length;
      mountedComponent.instance().handleNewTodoItem(testData.itemA);

      const finalState = mountedComponent.state();
      const newNumOfUncheckedItems = finalState.uncheckedItems.length;
      const isItemChecked = finalState.uncheckedItems[0].isChecked;
      const isItemA = finalState.uncheckedItems[0].id === testData.itemA.id;

      expect(newNumOfUncheckedItems).toBe(initialNumOfUncheckedItems + 1);
      expect(isItemChecked).toBeFalsy();
      expect(isItemA).toBeTruthy();
    });

    it('Invoking handleNewDoneItem adds a checked item to state.checkedItems', () => {
      const mountedComponent = mount(
        <App />
      );

      const initialNumOfCheckedItems = mountedComponent.state().checkedItems.length;
      mountedComponent.instance().handleNewDoneItem(testData.itemA);

      const finalState = mountedComponent.state();
      const newNumOfCheckedItems = finalState.checkedItems.length;
      const isItemChecked = finalState.checkedItems[0].isChecked;
      const isItemA = finalState.checkedItems[0].id === testData.itemA.id;

      expect(newNumOfCheckedItems).toBe(initialNumOfCheckedItems + 1);
      expect(isItemChecked).toBeTruthy();
      expect(isItemA).toBeTruthy();
    });

    it('Invoking handleItemCheck moves that item to state.checkedItems', () => {
      const mountedComponent = mount(
        <App />
      );

      mountedComponent.instance().handleNewTodoItem(testData.itemA);
      mountedComponent.instance().handleItemCheck(testData.itemA.id);

      const finalState = mountedComponent.state();

      const isItemAOnChecked = (
        finalState.checkedItems[0] && finalState.checkedItems[0].id === testData.itemA.id
      );

      const isItemAOnUnchecked = (
        finalState.uncheckedItems[0] && finalState.uncheckedItems[0].id === testData.itemA.id
      );

      expect(isItemAOnChecked).toBeTruthy();
      expect(isItemAOnUnchecked).toBeFalsy();
    });

    it('Invoking handleItemUncheck moves that item to state.uncheckedItems', () => {
      const mountedComponent = mount(
        <App />
      );

      mountedComponent.instance().handleNewDoneItem(testData.itemA);
      mountedComponent.instance().handleItemUncheck(testData.itemA.id);

      const finalState = mountedComponent.state();

      const isItemAOnChecked = (
        finalState.checkedItems[0] && finalState.checkedItems[0].id === testData.itemA.id
      );

      const isItemAOnUnchecked = (
        finalState.uncheckedItems[0] && finalState.uncheckedItems[0].id === testData.itemA.id
      );

      expect(isItemAOnChecked).toBeFalsy();
      expect(isItemAOnUnchecked).toBeTruthy();
    });
  });

  describe('Style tests', () => {
    describe('on desktop: 1366x768', () => {

      beforeAll(async () => {
        await page.setViewport({
          height: 768,
          width: 1366,
          isMobile: false,
          isLandscape: false,
        });

        await page.reload();
      });

      it('.app-todo-list is on the left side of .app-done-list', async () => {
        const todoPosX = await page.evaluate(() => {
          return document.querySelector('.app-todo-list').offsetLeft;
        });

        const donePosX = await page.evaluate(() => {
          return document.querySelector('.app-done-list').offsetLeft;
        });

        expect(donePosX).toBeGreaterThan(todoPosX);
      });

      it('.app-main does not take the entire screen', async () => {
        const appMainProperties = await page.evaluate(() => {
          const elem = document.querySelector('.app-main');

          return {
            x: elem.offsetLeft,
            y: elem.offsetTop,
            width: elem.offsetWidth,
            height: elem.offsetHeight,
          };
        });

        const deviceSizes = await page.evaluate(() => {
          return {
            height: window.innerHeight,
            width: window.innerWidth,
          };
        });

        expect(appMainProperties.x).toBeGreaterThan(0);
        expect(appMainProperties.y).toBeGreaterThan(0);
        expect(appMainProperties.x + appMainProperties.width).toBeLessThan(deviceSizes.width);
        expect(appMainProperties.y + appMainProperties.height).toBeLessThan(deviceSizes.height);
      });

      it('.app-main has border', async () => {
        const appMainBorder = await page.evaluate(() => {
          const style = window.getComputedStyle(
            document.querySelector('.app-main')
          );

          return style.border;
        });

        expect(appMainBorder).not.toMatch('0px');
        expect(appMainBorder).toMatch('px solid');
      });

    });

    describe('on mobile: 320x480', () => {

      beforeAll(async () => {
        await page.setViewport({
          height: 480,
          width: 320,
          isMobile: true,
          isLandscape: false,
        });

        await page.reload();
      });

      it('.app-todo-list is above .app-done-list', async () => {
        const todoPosY = await page.evaluate(() => {
          return document.querySelector('.app-todo-list').offsetTop;
        });

        const donePosY = await page.evaluate(() => {
          return document.querySelector('.app-done-list').offsetTop;
        });

        expect(donePosY).toBeGreaterThan(todoPosY);
      });

      it('.app-main takes then entire screen', async () => {
        const appMainProperties = await page.evaluate(() => {
          const elem = document.querySelector('.app-main');

          return {
            x: elem.offsetLeft,
            y: elem.offsetTop,
            width: elem.offsetWidth,
            height: elem.offsetHeight,
          };
        });

        const deviceSizes = await page.evaluate(() => {
          return {
            height: window.innerHeight,
            width: window.innerWidth,
          };
        });

        expect(appMainProperties.x).toBe(0);
        expect(appMainProperties.y).toBe(0);
        expect(appMainProperties.x + appMainProperties.width).toBe(deviceSizes.width);
        expect(appMainProperties.y + appMainProperties.height).toBe(deviceSizes.height);
      });

      it('.app-main has no border', async () => {
        const appMainBorder = await page.evaluate(() => {
          const style = window.getComputedStyle(
            document.querySelector('.app-main')
          );

          return style.border;
        });

        expect(appMainBorder).toMatch('0px');
      });

    });
  });

  afterAll(async () => {
    await browser.close();
  });

});
