import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NameForm extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };
  }

  onChange = (e) => {
    const user = e.target.value;
    this.setState({ user });
  }

  handleSubmit = (e) => {
    const { signUp } = this.props;
    const { user } = this.state;
    e.preventDefault();
    signUp(user);
    this.input.value = '';
  }

  render() {
    const { user } = this.state;
    return (
      <div className="who">
        <p>Hi, what`s your name?</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <input ref={ref => this.input = ref} autoFocus className="new_card_name" type="text" maxLength="10" placeholder="Your Name" value={user} required="required" onChange={this.onChange} />
            <input className="button" type="submit" value="Start" />
          </p>
        </form>
      </div>
    );
  }
}

NameForm.propTypes = {
  signUp: PropTypes.func.isRequired,
};

export default NameForm;
