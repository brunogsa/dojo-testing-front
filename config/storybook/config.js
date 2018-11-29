/* eslint import/no-extraneous-dependencies: 0 */
/* eslint global-require: 0 */
import { configure, setAddon } from '@storybook/react';

const req = require.context('../../src/', true, /storybook\.js[x]?$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
