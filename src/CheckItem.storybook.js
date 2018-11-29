import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';

import CheckItem from './CheckItem';
const stories = storiesOf('CheckItem', module);
stories.addDecorator(withKnobs);

stories.add('try yourself', () => (
  <CheckItem
    id="storybook-test"
    text={text('text', 'Dummy text 123')}
    isChecked={boolean('isChecked', '')}
    onClick={action('onClick')}
  />
));

stories.add('static: checked', () => (
  <CheckItem
    id="storybook-test"
    text="Dummy text 123"
    isChecked
    onClick={() => {}}
  />
));

stories.add('static: not checked', () => (
  <CheckItem
    id="storybook-test"
    text="Dummy text 123"
    isChecked={false}
    onClick={() => {}}
  />
));
