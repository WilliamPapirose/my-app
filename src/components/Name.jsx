import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Name extends Component {
  constructor(props) {
    super(props);
    const { name } = this.props;
    this.state = {
      name,
      length: name.length,
      maxLength: 42,
      countColor: '#fff',
      isFormShowed: false,
    };
  }

  onChange = (e) => {
    const { user, author } = this.props;
    const { maxLength } = this.state;
    if (user !== author) e.preventDefault();
    else this.setState({ length: this.Name.innerText.length, countColor: (this.Name.innerText.length > maxLength) ? '#f00' : '#fff' });
  }

  handleSubmit = () => {
    const { maxLength } = this.state;
    const { rename } = this.props;
    if (this.Name.innerText !== '' && this.Name.innerText.length <= maxLength) {
      this.setState({
        name: this.Name.innerText,
        length: this.Name.innerText.length,
        countColor: '#fff',
        isFormShowed: false,
      });
      rename(this.Name.innerText);
    } else alert('Wrong length: '+this.Name.innerText.length+'/'+this.state.maxLength)
    this.Name.blur();
  }

  handleKeyDown = (e) => {
    const keyValue = e.key;
    if (keyValue === 'Enter') {
      e.preventDefault();
      this.handleSubmit();
    }
  }

  render() {
    const { user, author } = this.props;
    const {
      maxLength,
      length,
      name,
      isFormShowed,
      countColor,
    } = this.state;
    return (
      <div>
        <div
          role="presentation"
          onKeyDown={this.handleKeyDown}
          ref={ref => this.Name = ref}
          onFocus={() => {
            if (user === author) {
              this.setState({ isFormShowed: true, countColor: (this.Name.innerText.length > maxLength) ? '#f00' : '#fff' });
            } else this.Name.blur();
          }}
          contentEditable="true"
          onKeyPress={(e) => { this.onChange(e); }}
          onKeyUpCapture={(e) => { this.onChange(e); }}
          className="name"
        >
          {name}
        </div>
        {isFormShowed && (
          <div style={{ marginTop: '10px' }}>
            <div style={{ color: countColor }}>
              {length}
              /
              {maxLength}
            </div>
            <button type="button" className="button" onClick={this.handleSubmit}>Save</button>
            <button
              type="button"
              className="button"
              onClick={() => {
                this.Name.innerHTML = name; 
                this.setState({ isFormShowed: false, length: name.length });
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  }
}

Name.propTypes = {
  rename: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Name;
