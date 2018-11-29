import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import generateId from 'nanoid';

import './CheckList.css';
import CheckItem from './CheckItem';

class CheckList extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    placeholderText: PropTypes.string,

    items: PropTypes.arrayOf(PropTypes.shape({

      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isChecked: PropTypes.bool.isRequired,

    })).isRequired,

    /**
     * @callback
     * @param {object} item
     * @param {string} item.id
     * @param {string} item.text
     * @param {bool}   item.isChecked Always false
     */
    onNewItem: PropTypes.func.isRequired,

    /**
     * @callback
     * @param {string}  itemId
     */
    onCheck: PropTypes.func.isRequired,

    /**
     * @callback
     * @param {string}  itemId
     */
    onUncheck: PropTypes.func.isRequired,
  }

  static defaultProps = {
    placeholderText: '',
  }

  constructor() {
    super();

    this.state = {
      text: '',
    };
  }

  handleInputText(text) {
    // TODO
  }

  handleKeyPress(keyCode) {
    // TODO
  }

  render() {
    return (
      <div id={this.props.id} className="checklist-wrapper">

        <input
          placeholder={this.props.placeholderText}
          type="text"
          value={this.state.text}

          className="checklist-input"

          onChange={evt => this.handleInputText(evt.target.value)}
          onKeyDown={evt => this.handleKeyPress(evt.keyCode)}
        />

        <div className="checklist-items-wrapper">
          TODO: Items will be here
        </div>

      </div>
    );
  }
}

export default CheckList;
