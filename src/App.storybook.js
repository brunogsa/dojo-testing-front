import React from 'react';

import { storiesOf } from '@storybook/react';

import App from './App';
const stories = storiesOf('App', module);

stories.add('receives no props', () => (
  <App />
));
