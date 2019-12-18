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
    this.setState({ text });
  }

  handleKeyPress(keyCode) {
    const ENTER_CODE = 13;

    if (keyCode === ENTER_CODE) {
      this.props.onNewItem({
        id: generateId(),
        text: this.state.text,
        isChecked: false,
      });

      this.setState({
        text: '',
      });
    }
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
          {this.props.items.map(item => {
            return (
              <CheckItem
                key={item.id}
                id={item.id}

                text={item.text}
                isChecked={item.isChecked}

                onClick={id => (item.isChecked ? this.props.onUncheck : this.props.onCheck)(item.id)}
              />
            );
          })}
        </div>

      </div>
    );
  }
}

export default CheckList;
