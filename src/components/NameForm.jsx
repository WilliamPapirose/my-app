import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NameForm extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    this.input.focus();
  }

  componentDidUpdate() {
    this.input.focus();
  }

  onChange = (e) => {
    const user = e.target.value;
    this.setState({ user });
  }

  handleSubmit = (e) => {
    const { signIn } = this.props;
    const { user } = this.state;
    e.preventDefault();
    signIn(user);
    this.setState({ user: '' });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="who">
        <p>Hi, what`s your name?</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <input
              ref={(ref) => { this.input = ref; }}
              className="new_card_name"
              type="text"
              maxLength="10"
              placeholder="Your Name"
              value={user}
              required
              onChange={this.onChange} />
            <input className="button" type="submit" value="Start" />
          </p>
        </form>
      </div>
    );
  }
}

NameForm.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default NameForm;
