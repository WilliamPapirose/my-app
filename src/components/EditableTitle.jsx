import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SignIn extends Component {
  constructor(props) {
    super(props);
    const { name } = this.props;
    this.state = {
      name,
      length: name.length,
      maxLength: 42,
      countOk: true,
      isFormShowed: false,
    };
  }

  onChange = (e) => {
    const { canEdit } = this.props;
    const { maxLength } = this.state;
    if (!canEdit) e.preventDefault();
    else {
      this.setState({
        length: this.Name.innerText.length,
        countOk: (this.Name.innerText.length < maxLength),
      });
    }
  }

  handleSubmit = () => {
    const { maxLength } = this.state;
    const { rename } = this.props;
    if (this.Name.innerText !== '' && this.Name.innerText.length <= maxLength) {
      this.setState({
        name: this.Name.innerText,
        length: this.Name.innerText.length,
        countOk: true,
        isFormShowed: false,
      });
      rename(this.Name.innerText);
    }
    this.Name.blur();
  }

  handleKeyDown = (e) => {
    const keyValue = e.key;
    if (keyValue === 'Enter') {
      e.preventDefault();
      this.handleSubmit();
    }
  }

  countCheck = () => {
    const { canEdit } = this.props;
    const { maxLength } = this.state;
    if (canEdit) {
      this.setState({
        isFormShowed: true,
        countOk: (this.Name.innerText.length < maxLength),
      });
    } else this.Name.blur();
  }

  cancel = () => {
    const { name } = this.state;
    this.Name.innerHTML = name;
    this.setState({ isFormShowed: false, length: name.length });
  }

  render() {
    const {
      maxLength,
      length,
      name,
      isFormShowed,
      countOk,
    } = this.state;
    return (
      <div>
        <div
          role="presentation"
          onKeyDown={this.handleKeyDown}
          ref={(ref) => { this.Name = ref; }}
          onFocus={this.countCheck}
          contentEditable="true"
          onKeyPress={this.onChange}
          onKeyUpCapture={this.onChange}
          className="name"
        >
          {name}
        </div>
        {isFormShowed && (
          <div>
            <div className={countOk ? 'white' : 'red'}>
              {length}
              /
              {maxLength}
            </div>
            <button type="button" className="button" onClick={this.handleSubmit}>Save</button>
            <button type="button" className="button" onClick={this.cancel}>Cancel</button>
          </div>
        )}
      </div>
    );
  }
}

SignIn.propTypes = {
  rename: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  canEdit: PropTypes.bool.isRequired,
};

export default SignIn;
