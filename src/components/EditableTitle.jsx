import React, { Component } from 'react';
import PropTypes from 'prop-types';

const maxLength = 42;

class EditableTitle extends Component {
  constructor(props) {
    super(props);
    const { name } = this.props;
    this.state = {
      name,
      length: name.length,
      isFormShowed: false,
    };
  }

  onChange = (e) => {
    const { canEdit } = this.props;
    if (!canEdit) e.preventDefault();
    else {
      this.setState({
        length: this.titleText.innerText.length,
      });
    }
  }

  handleSubmit = () => {
    const { rename } = this.props;
    if (this.titleText.innerText !== '' && this.titleText.innerText.length <= maxLength) {
      this.setState({
        name: this.titleText.innerText,
        isFormShowed: false,
      });
      rename(this.titleText.innerText);
    }
    this.titleText.blur();
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
    if (canEdit) {
      this.setState({
        isFormShowed: true,
      });
    } else this.titleText.blur();
  }

  cancel = () => {
    const { name } = this.state;
    this.titleText.innerHTML = name;
    this.setState({ isFormShowed: false, length: name.length });
  }

  render() {
    const {
      length,
      name,
      isFormShowed,
    } = this.state;
    return (
      <div>
        <div
          suppressContentEditableWarning
          role="presentation"
          onKeyDown={this.handleKeyDown}
          ref={(ref) => { this.titleText = ref; }}
          onFocus={this.countCheck}
          contentEditable="true"
          onKeyPress={this.onChange}
          onKeyUpCapture={this.onChange}
          className="name"
        >
          {name}
        </div>
        {isFormShowed && (
          <React.Fragment>
            <div className={length < maxLength ? 'white' : 'red'}>
              {length}/{maxLength}
            </div>
            <button type="button" className="button" onClick={this.handleSubmit}>Save</button>
            <button type="button" className="button" onClick={this.cancel}>Cancel</button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

EditableTitle.propTypes = {
  rename: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  canEdit: PropTypes.bool.isRequired,
};

export default EditableTitle;
