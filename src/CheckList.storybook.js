import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CheckList from './CheckList';
const stories = storiesOf('CheckList', module);

stories.add('try yourself', () => (
  <CheckList
    id="storybook-test"
    placeholderText="Write anything here"

    items={[
      {
        id: 'item1',
        text: 'Item 1',
        isChecked: true,
      },

      {
        id: 'item2',
        text: 'Item 2',
        isChecked: false,
      }
    ]}

    onNewItem={action('onNewItem')}
    onCheck={action('onCheck')}
    onUncheck={action('onUncheck')}
  />
));
