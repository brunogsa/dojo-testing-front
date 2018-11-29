import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './CheckItem.css';

class CheckItem extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string,
    isChecked: PropTypes.bool,

    /**
     * @callback
     * @param {string} id
     */
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    text: '',
    isChecked: false,
  }

  render() {
    return (
      <div
        id={this.props.id}
        className="check-item-wrapper"
        onClick={evt => this.props.onClick(this.props.id)}
      >
        <input
          type="checkbox"
          checked={this.props.isChecked}
          className="check-item-checkbox"
          onChange={evt => this.props.onClick(this.props.id)}
        />

        <p className={`check-item-text ${this.props.isChecked ? 'checked' : ''}`}>
          {this.props.text}
        </p>
      </div>
    );
  }
}

export default CheckItem;
